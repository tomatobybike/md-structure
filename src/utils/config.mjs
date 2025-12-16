import fs from 'fs'
import path from 'path'

const CONFIG_FILE = 'md-structure.config.json'

export function writeConfig(config, cwd = process.cwd()) {
  const filePath = path.join(cwd, CONFIG_FILE)
  fs.writeFileSync(filePath, JSON.stringify(config, null, 2))
  return filePath
}

export function readConfig(cwd = process.cwd()) {
  const filePath = path.join(cwd, CONFIG_FILE)
  if (!fs.existsSync(filePath)) return null
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'))
}
