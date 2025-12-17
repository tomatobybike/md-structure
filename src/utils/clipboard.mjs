import clipboard from 'clipboardy'

export async function copyToClipboard(text) {
  if (!text) return false
  await clipboard.write(text)
  return true
}
