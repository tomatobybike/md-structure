/**
 * Normalize "only" value for inquirer input default
 * Accepts string | string[] | null | undefined
 */
export function formatOnlyForInput(value) {
  if (typeof value === 'string') {
    return value
  }

  if (Array.isArray(value)) {
    return value.join(',')
  }

  return ''
}
