import { isInteractiveTTY } from '../utils/tty.mjs'

let runtime = {
  json: false,
  quiet: false,
  tty: isInteractiveTTY()
}

export function setRuntime(next) {
  const merged = { ...runtime, ...next }

  // ✅ 关键：json implies quiet
  if (merged.json) {
    merged.quiet = true
  }

  runtime = merged
}

export function initRuntime(options = {}) {
  runtime.json = Boolean(options.json)
  runtime.quiet = runtime.json || Boolean(options.quiet)
}

export function getRuntime() {
  return runtime
}

export function isJsonMode() {
  return runtime.json
}

export function isQuietMode() {
  return runtime.quiet
}

export function isTTY() {
  return runtime.tty
}
