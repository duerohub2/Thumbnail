export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function degreesToRadians(deg: number): number {
  return (deg * Math.PI) / 180;
}

export function snap(value: number, gridSize: number): number {
  return Math.round(value / gridSize) * gridSize;
}
