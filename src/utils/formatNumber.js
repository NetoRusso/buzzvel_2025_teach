
export function formatNumber(num) {
  if (num >= 1000) {
    return `${Math.floor(num / 1000)}M`;
  }
  return `${num}`;
}