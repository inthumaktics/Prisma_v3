export function dmClamp(v, a, b) {
  return Math.min(b, Math.max(a, v));
}

export function dmR(v) {
  return dmClamp(Math.round(v * 10) / 10, 1, 5);
}
export const dmF = v => v.toFixed(1);
