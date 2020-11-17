export default function secondsToMs(seconds: number): string {
  const m = (seconds / 60) | 0;
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}
