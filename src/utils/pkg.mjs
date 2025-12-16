import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

export function getPackage() {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)

  const pkg = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, '../../package.json'), 'utf8')
  )

  return pkg
}
