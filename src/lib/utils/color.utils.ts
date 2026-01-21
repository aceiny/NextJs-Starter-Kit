
/**
 * Function to convert hex color to rgba
 * @param hex 
 * @param alpha 
 * @returns 
 */
export function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * Function to darken a hex color
 * @param hex 
 * @param amount 
 * @returns 
 */
export function darkenColor(hex: string, amount: number = 0.3): string {
  const r = Math.max(0, parseInt(hex.slice(1, 3), 16) - amount * 255);
  const g = Math.max(0, parseInt(hex.slice(3, 5), 16) - amount * 255);
  const b = Math.max(0, parseInt(hex.slice(5, 7), 16) - amount * 255);
  return `#${Math.floor(r).toString(16).padStart(2, '0')}${Math.floor(g).toString(16).padStart(2, '0')}${Math.floor(b).toString(16).padStart(2, '0')}`;
}
