import fs from 'fs'
import path from 'path'

const IGNORE = ['node_modules', '.git']

function normalizeList(value, defaultValue = null) {
  if (!value) return defaultValue
  if (Array.isArray(value)) return value
  if (typeof value === 'string') {
    return value
      .split(',')
      .map((v) => v.trim())
      .filter(Boolean)
  }
  return defaultValue
}

export function generateStructure({
  root,
  depth: maxDepth,
  bullet,
  only,
  exclude
}) {
  const lines = []

  const onlyExts = normalizeList(only)
  const excludeDirs = new Set(normalizeList(exclude, IGNORE))

  function walk(dir, depth) {
    if (depth > maxDepth) return

    const entries = fs
      .readdirSync(dir, { withFileTypes: true })
      .filter((e) => !excludeDirs.has(e.name))

    // 目录优先，其次文件名排序
    entries.sort((a, b) => {
      if (a.isDirectory() && !b.isDirectory()) return -1
      if (!a.isDirectory() && b.isDirectory()) return 1
      return a.name.localeCompare(b.name)
    })

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name)

      // 反转条件，将 `continue` 替换为包裹剩余逻辑的 `if` 块
      const shouldProcessEntry = !(
        entry.isFile() &&
        onlyExts &&
        !onlyExts.some((ext) => entry.name.endsWith(ext))
      )

      if (shouldProcessEntry) {
        const indent = '  '.repeat(depth)
        lines.push(`${indent}${bullet} ${entry.name}`)

        if (entry.isDirectory()) {
          walk(fullPath, depth + 1)
        }
      }
    }
  }

  lines.push(`${bullet} ${root}`)
  walk(root, 1)

  return lines.join('\n')
}
