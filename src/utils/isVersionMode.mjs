export function isVersionMode(argv = process.argv) {
  return argv.includes('-v') || argv.includes('--version')
}
