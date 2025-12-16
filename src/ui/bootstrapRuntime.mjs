import { setRuntime } from './runtime.mjs'

export function bootstrapRuntime(argv = process.argv.slice(2)) {
  const runtime = {}

  if (argv.includes('--json')) {
    runtime.json = true
  }

  // 未来可扩展
  // if (argv.includes('--quiet')) runtime.quiet = true
  // if (argv.includes('--no-color')) runtime.color = false

  setRuntime(runtime)
}
