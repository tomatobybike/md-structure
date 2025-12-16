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
  // ---------- root 校验（参数级错误） ----------
  if (!fs.existsSync(root)) {
    throw new Error(`Root directory does not exist: ${root}`)
  }

  const stat = fs.statSync(root)
  if (!stat.isDirectory()) {
    throw new Error(`Root path is not a directory: ${root}`)
  }

  const lines = []

  const onlyExts = normalizeList(only)
  const excludeDirs = new Set(normalizeList(exclude, IGNORE))

  function walk(dir, depth) {
    if (depth > maxDepth) return

    let entries
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true })
    } catch {
      // 权限不足 / IO 异常，直接跳过该目录
      return
    }

    entries = entries.filter((e) => !excludeDirs.has(e.name))

    // 目录优先，其次按名称排序
    entries.sort((a, b) => {
      if (a.isDirectory() && !b.isDirectory()) return -1
      if (!a.isDirectory() && b.isDirectory()) return 1
      return a.name.localeCompare(b.name)
    })

    for (const entry of entries) {
      // 文件扩展名过滤
      const shouldInclude =
        !entry.isFile() ||
        !onlyExts ||
        onlyExts.some((ext) => entry.name.endsWith(ext))

      if (shouldInclude) {
        const indent = '  '.repeat(depth)
        lines.push(`${indent}${bullet} ${entry.name}`)

        if (entry.isDirectory()) {
          walk(path.join(dir, entry.name), depth + 1)
        }
      }
    }
  }

  // 根节点
  lines.push(`${bullet} ${root}`)
  walk(root, 1)

  return lines.join('\n')
}
