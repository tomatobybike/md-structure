import fs from 'fs'

export function insertIntoReadme({ content, start, end }) {
  const file = 'README.md'

  if (!fs.existsSync(file)) {
    console.warn('⚠ README.md not found')
    return
  }

  const raw = fs.readFileSync(file, 'utf-8')

  const startIndex = raw.indexOf(start)
  const endIndex = raw.indexOf(end)

  if (startIndex === -1 || endIndex === -1) {
    console.warn('⚠ Structure markers not found')
    return
  }

  if (endIndex <= startIndex) {
    console.warn('⚠ Invalid marker order')
    return
  }

  const before = raw.slice(0, startIndex + start.length)
  const after = raw.slice(endIndex)

  const block = [
    `\n\n`,
    '```md',
    content,
    '```',
    '\n\n'
  ].join('\n')

  const updated = before + block + after

  fs.writeFileSync(file, updated, 'utf-8')
  console.log('✔ README.md updated')
}
