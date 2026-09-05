/**
 * The morph runs entirely on the GPU: all three formations live in vertex
 * attributes and `uMorph` (0..2) picks and blends the active pair, so scrolling
 * costs one uniform write per frame instead of rewriting a position buffer.
 */

const MORPH = /* glsl */ `
  vec3 morphedPosition() {
    if (uMorph < 1.0) {
      return mix(aPos0, aPos1, smoothstep(0.0, 1.0, uMorph));
    }
    return mix(aPos1, aPos2, smoothstep(0.0, 1.0, uMorph - 1.0));
  }
`;

export const pointsVertexShader = /* glsl */ `
  attribute vec3 aPos0;
  attribute vec3 aPos1;
  attribute vec3 aPos2;
  attribute float aSeed;
  attribute float aBand;

  uniform float uMorph;
  uniform float uTime;
  uniform float uSize;
  uniform float uPixelRatio;

  varying float vGlow;

  ${MORPH}

  void main() {
    vec3 pos = morphedPosition();

    // Idle drift so the field breathes even when nobody is scrolling.
    float t = uTime * 0.35 + aSeed * 6.2831;
    pos += vec3(sin(t), cos(t * 1.3), sin(t * 0.7)) * 0.055;

    // A signal sweeping band to band, like traffic moving through the system.
    float wave = sin(uTime * 1.1 - aBand * 0.9);
    float pulse = smoothstep(0.72, 1.0, wave) * (0.35 + aSeed * 0.65);

    vGlow = clamp(pulse + aSeed * 0.28, 0.0, 1.0);

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize =
      uSize * uPixelRatio * (0.55 + aSeed * 0.75) * (1.0 + pulse * 1.1) * (12.0 / -mvPosition.z);
  }
`;

export const pointsFragmentShader = /* glsl */ `
  precision mediump float;

  uniform vec3 uColorCool;
  uniform vec3 uColorHot;
  uniform float uOpacity;

  varying float vGlow;

  void main() {
    // Round the square point sprite into a soft disc.
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float alpha = smoothstep(0.5, 0.06, d);

    vec3 color = mix(uColorCool, uColorHot, vGlow);
    gl_FragColor = vec4(color, alpha * uOpacity * (0.45 + vGlow * 0.55));
  }
`;

export const linesVertexShader = /* glsl */ `
  attribute vec3 aPos0;
  attribute vec3 aPos1;
  attribute vec3 aPos2;
  attribute float aSeed;
  attribute float aBand;

  uniform float uMorph;
  uniform float uTime;

  varying float vGlow;

  ${MORPH}

  void main() {
    vec3 pos = morphedPosition();

    float t = uTime * 0.35 + aSeed * 6.2831;
    pos += vec3(sin(t), cos(t * 1.3), sin(t * 0.7)) * 0.055;

    float wave = sin(uTime * 1.1 - aBand * 0.9);
    vGlow = smoothstep(0.72, 1.0, wave);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

export const linesFragmentShader = /* glsl */ `
  precision mediump float;

  uniform vec3 uColorCool;
  uniform vec3 uColorHot;
  uniform float uOpacity;

  varying float vGlow;

  void main() {
    vec3 color = mix(uColorCool, uColorHot, vGlow);
    gl_FragColor = vec4(color, uOpacity * (0.25 + vGlow * 0.75));
  }
`;
