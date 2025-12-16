export function renderDryRun(content) {
  return `
[DRY RUN]
No files will be written.

${content}

Run without --dry-run to write files.
`.trim()
}

export function renderJsonResult(data) {
  return JSON.stringify(data, null, 2)
}
