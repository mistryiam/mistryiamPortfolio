import { useEffect, useMemo, useRef, type MutableRefObject } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  Group,
  ShaderMaterial,
} from 'three';
import { bandEdges, distributedCluster, neuralLattice, scaleSurface, BANDS } from './formations';
import type { ScrollState } from '../hooks/useScrollProgress';
import {
  linesFragmentShader,
  linesVertexShader,
  pointsFragmentShader,
  pointsVertexShader,
} from './shaders';

type Props = {
  count: number;
  edgeCount: number;
  scroll: MutableRefObject<ScrollState>;
  pointerLerp: MutableRefObject<{ x: number; y: number }>;
  animate: boolean;
};

/** How visible the field is in the hero, and how far it recedes behind body copy. */
const POINT_OPACITY = { hero: 1, content: 0.38 };
const LINE_OPACITY = { hero: 0.26, content: 0.1 };

const COOL = new Color('#7f63d8');
const HOT = new Color('#ffab3d');

export function SystemsField({ count, edgeCount, scroll, pointerLerp, animate }: Props) {
  const group = useRef<Group>(null);
  const dpr = useThree((s) => s.viewport.dpr);
  const invalidate = useThree((s) => s.invalidate);

  // Under reduced motion the render loop is on demand, so scrolling has to ask
  // for the frames that carry the morph forward. Without this the field freezes
  // in the first formation for those users.
  useEffect(() => {
    if (animate) return;
    const onScroll = () => invalidate();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [animate, invalidate]);

  const { pointsGeometry, linesGeometry, pointsMaterial, linesMaterial } = useMemo(() => {
    const pos0 = neuralLattice(count);
    const pos1 = distributedCluster(count);
    const pos2 = scaleSurface(count);

    const perBand = Math.ceil(count / BANDS);
    const seeds = new Float32Array(count);
    const bands = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      // Cheap deterministic per-point variation: size, brightness, drift phase.
      seeds[i] = (((Math.sin(i * 12.9898) * 43758.5453) % 1) + 1) % 1;
      bands[i] = Math.floor(i / perBand);
    }

    const points = new BufferGeometry();
    // `position` is never read by the shader, but three needs one to size the
    // draw call; the real coordinates come from the three aPos attributes.
    points.setAttribute('position', new BufferAttribute(pos0.slice(), 3));
    points.setAttribute('aPos0', new BufferAttribute(pos0, 3));
    points.setAttribute('aPos1', new BufferAttribute(pos1, 3));
    points.setAttribute('aPos2', new BufferAttribute(pos2, 3));
    points.setAttribute('aSeed', new BufferAttribute(seeds, 1));
    points.setAttribute('aBand', new BufferAttribute(bands, 1));

    // Edges get flattened into their own geometry so each vertex carries the
    // endpoint's three formation positions and morphs in lockstep with the points.
    const pairs = bandEdges(count, edgeCount);
    const verts = pairs.length;
    const ePos0 = new Float32Array(verts * 3);
    const ePos1 = new Float32Array(verts * 3);
    const ePos2 = new Float32Array(verts * 3);
    const eSeed = new Float32Array(verts);
    const eBand = new Float32Array(verts);

    for (let v = 0; v < verts; v++) {
      const src = pairs[v];
      for (let c = 0; c < 3; c++) {
        ePos0[v * 3 + c] = pos0[src * 3 + c];
        ePos1[v * 3 + c] = pos1[src * 3 + c];
        ePos2[v * 3 + c] = pos2[src * 3 + c];
      }
      eSeed[v] = seeds[src];
      eBand[v] = bands[src];
    }

    const lines = new BufferGeometry();
    lines.setAttribute('position', new BufferAttribute(ePos0.slice(), 3));
    lines.setAttribute('aPos0', new BufferAttribute(ePos0, 3));
    lines.setAttribute('aPos1', new BufferAttribute(ePos1, 3));
    lines.setAttribute('aPos2', new BufferAttribute(ePos2, 3));
    lines.setAttribute('aSeed', new BufferAttribute(eSeed, 1));
    lines.setAttribute('aBand', new BufferAttribute(eBand, 1));

    const shared = {
      uMorph: { value: 0 },
      uTime: { value: 0 },
      uColorCool: { value: COOL },
      uColorHot: { value: HOT },
    };

    const pointsMat = new ShaderMaterial({
      uniforms: {
        ...shared,
        uSize: { value: 7.5 },
        uPixelRatio: { value: 1 },
        uOpacity: { value: POINT_OPACITY.hero },
      },
      vertexShader: pointsVertexShader,
      fragmentShader: pointsFragmentShader,
      transparent: true,
      depthWrite: false,
      blending: AdditiveBlending,
    });

    const linesMat = new ShaderMaterial({
      uniforms: {
        uMorph: shared.uMorph,
        uTime: shared.uTime,
        uColorCool: shared.uColorCool,
        uColorHot: shared.uColorHot,
        uOpacity: { value: LINE_OPACITY.hero },
      },
      vertexShader: linesVertexShader,
      fragmentShader: linesFragmentShader,
      transparent: true,
      depthWrite: false,
      blending: AdditiveBlending,
    });

    return {
      pointsGeometry: points,
      linesGeometry: lines,
      pointsMaterial: pointsMat,
      linesMaterial: linesMat,
    };
  }, [count, edgeCount]);

  useFrame((state, delta) => {
    pointsMaterial.uniforms.uPixelRatio.value = dpr;

    // Full strength behind the hero, then receding to a texture so body copy
    // stays readable over it. This is the whole reason the field can be bright.
    const { hero } = scroll.current;
    const fade = hero * hero;
    pointsMaterial.uniforms.uOpacity.value =
      POINT_OPACITY.content + (POINT_OPACITY.hero - POINT_OPACITY.content) * fade;
    linesMaterial.uniforms.uOpacity.value =
      LINE_OPACITY.content + (LINE_OPACITY.hero - LINE_OPACITY.content) * fade;

    // Scroll drives the morph across the full 0..2 range: neural → cluster → scale.
    const target = scroll.current.page * 2;
    const current = pointsMaterial.uniforms.uMorph.value as number;
    // Frame-rate independent easing, so a 120Hz display morphs at the same speed as 60Hz.
    const eased = animate ? current + (target - current) * (1 - Math.exp(-6 * delta)) : target;
    pointsMaterial.uniforms.uMorph.value = eased;

    if (!animate) {
      // Reduced motion: hold a still frame, but still let scroll change formation.
      pointsMaterial.uniforms.uTime.value = 0;
      return;
    }

    pointsMaterial.uniforms.uTime.value = state.clock.elapsedTime;

    if (group.current) {
      group.current.rotation.y += delta * 0.045;
      // Pointer parallax, damped so the field leans rather than snaps.
      const { x, y } = pointerLerp.current;
      group.current.rotation.x +=
        (y * 0.22 - group.current.rotation.x) * (1 - Math.exp(-3 * delta));
      group.current.position.x += (x * 0.6 - group.current.position.x) * (1 - Math.exp(-3 * delta));
    }
  });

  return (
    <group ref={group} scale={1.45}>
      {/* Positions live in custom attributes, so three's bounding sphere is wrong
          by construction — culling has to be off or the field vanishes mid-morph. */}
      <points geometry={pointsGeometry} material={pointsMaterial} frustumCulled={false} />
      <lineSegments geometry={linesGeometry} material={linesMaterial} frustumCulled={false} />
    </group>
  );
}
