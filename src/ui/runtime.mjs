let runtime = {
  json: false,
  quiet: false,
}

export function setRuntime(next) {
  const merged = { ...runtime, ...next }

  // ✅ 关键：json implies quiet
  if (merged.json) {
    merged.quiet = true
  }

  runtime = merged
}

export function isJsonMode() {
  return runtime.json === true
}

export function isQuietMode() {
  return runtime.quiet === true
}
