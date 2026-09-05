/**
 * Position sets for the hero field.
 *
 * Every point keeps its index across all three formations, and index space is cut
 * into `BANDS` contiguous bands. Each formation places a band as one coherent
 * structure — a network layer, a ring in the cluster, a strip of the wave grid —
 * so the edges drawn between adjacent bands stay readable no matter which
 * formation is on screen. Without that shared banding the connecting lines turn
 * into noise the moment the points morph.
 */

export const BANDS = 6;

/** Deterministic hash in [0, 1). Keeps every render of the field identical. */
function rand(seed: number): number {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

const TAU = Math.PI * 2;

/** Layered planes with jittered points — a neural network seen edge-on. */
export function neuralLattice(count: number): Float32Array {
  const out = new Float32Array(count * 3);
  const perBand = Math.ceil(count / BANDS);
  const side = Math.ceil(Math.sqrt(perBand));

  for (let i = 0; i < count; i++) {
    const band = Math.floor(i / perBand);
    const j = i % perBand;
    const col = j % side;
    const row = Math.floor(j / side);

    const u = (col / (side - 1)) * 2 - 1;
    const v = (row / (side - 1)) * 2 - 1;
    // Pull the corners in so each layer reads as a soft disc, not a hard square.
    const falloff = 1 - 0.35 * Math.min(1, u * u + v * v);

    out[i * 3] = (band - (BANDS - 1) / 2) * 2.5 + (rand(i * 1.7) - 0.5) * 0.5;
    out[i * 3 + 1] = u * 3.1 * falloff + (rand(i * 3.3) - 0.5) * 0.35;
    out[i * 3 + 2] = v * 3.1 * falloff + (rand(i * 5.9) - 0.5) * 0.35;
  }
  return out;
}

/** Concentric tilted rings — services and the events orbiting between them. */
export function distributedCluster(count: number): Float32Array {
  const out = new Float32Array(count * 3);
  const perBand = Math.ceil(count / BANDS);

  for (let i = 0; i < count; i++) {
    const band = Math.floor(i / perBand);
    const j = i % perBand;

    const radius = 1.5 + band * 0.85 + (rand(i * 2.1) - 0.5) * 0.35;
    const angle = (j / perBand) * TAU + rand(i * 4.4) * 0.25 + band * 0.6;
    const tilt = band * 0.22;

    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    const y = (rand(i * 6.7) - 0.5) * 0.5;

    // Rotate each ring about X so the rings nest instead of stacking flat.
    out[i * 3] = x;
    out[i * 3 + 1] = y * Math.cos(tilt) - z * Math.sin(tilt);
    out[i * 3 + 2] = y * Math.sin(tilt) + z * Math.cos(tilt);
  }
  return out;
}

/** A wide rippling grid — throughput spread across a very large surface. */
export function scaleSurface(count: number): Float32Array {
  const out = new Float32Array(count * 3);
  const perBand = Math.ceil(count / BANDS);
  const rowsPerBand = 3;

  for (let i = 0; i < count; i++) {
    const band = Math.floor(i / perBand);
    const j = i % perBand;
    const perRow = Math.ceil(perBand / rowsPerBand);
    const row = Math.floor(j / perRow);
    const col = j % perRow;

    const x = ((col / (perRow - 1)) * 2 - 1) * 7.5 + (rand(i * 1.3) - 0.5) * 0.3;
    const z = (band - (BANDS - 1) / 2) * 1.5 + row * 0.42 + (rand(i * 8.1) - 0.5) * 0.2;
    const y = Math.sin(x * 0.7 + z * 0.5) * 0.65 + Math.cos(x * 0.35) * 0.25;

    out[i * 3] = x;
    out[i * 3 + 1] = y;
    out[i * 3 + 2] = z;
  }
  return out;
}

/**
 * Index pairs joining a point in one band to a point in the next. Because bands
 * stay adjacent in all three formations, these read as structure everywhere.
 */
export function bandEdges(count: number, maxEdges: number): Uint32Array {
  const perBand = Math.ceil(count / BANDS);
  const pairs: number[] = [];
  const stride = Math.max(1, Math.floor(((BANDS - 1) * perBand) / maxEdges));

  for (let band = 0; band < BANDS - 1; band++) {
    for (let j = 0; j < perBand; j += stride) {
      const a = band * perBand + j;
      // Offset the target within the next band so edges fan rather than run parallel.
      const b = (band + 1) * perBand + ((j + Math.floor(rand(a) * perBand * 0.3)) % perBand);
      if (a < count && b < count) pairs.push(a, b);
    }
  }
  return new Uint32Array(pairs);
}
