export function isInteractiveTTY() {
  return Boolean(process.stdout.isTTY)
}
