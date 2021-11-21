// Formatting view numbers
export function formatViews(num: number) {
  if (num === 1) {
    return "1 view";
  }
  if (num > 1e6) {
    return Math.floor(num / 1e6) + "M views";
  }
  if (num >= 1e3) {
    return Math.floor(num / 1e3) + "K views";
  }
  return num + " views";
}
