import { isQuietMode } from '../runtime.mjs'

export function renderDoctorResult(results) {
  if (isQuietMode()) return null
  return results
    .map(
      (r) =>
        `${r.ok ? '✔' : '✖'} ${r.name}${r.message ? ` - ${r.message}` : ''}`
    )
    .join('\n')
}
