/**
 * @file: normalizeConfig.mjs
 * @description:
 * @author: King Monkey
 * @created: 2025-12-17 18:12
 */
import path from 'path'
import process from 'process'

const DEFAULT_ROOT = process.cwd()

const CONFIG_DEFAULTS = {
  root: '.',
  depth: Infinity,
  bullet: '├──',
  output: 'STRUCTURE.md',
  only: ['.mjs', '.ts', '.js', '.jsx', '.css', '.less','.md'],
  // only: null,
  exclude: ['node_modules', '.git', '.history', '.husky'],
  insertReadme: true,
  start: '<!-- STRUCTURE_START -->',
  end: '<!-- STRUCTURE_END -->',
  dryRun: false
}

/**
 * 👉 专供 init / UI 使用
 * - 不暴露 Infinity
 * - 数组转字符串
 */
export function getInitDefaults() {
  return {
    root: CONFIG_DEFAULTS.root,
    depth: CONFIG_DEFAULTS.depth === Infinity ? 5 : CONFIG_DEFAULTS.depth,
    bullet: CONFIG_DEFAULTS.bullet,
    only: CONFIG_DEFAULTS.only?.join(',') ?? '',
    exclude: CONFIG_DEFAULTS.exclude.join(','),
    output: CONFIG_DEFAULTS.output,
    insertReadme: CONFIG_DEFAULTS.insertReadme
  }
}

function normalizeList(value, fallback = null) {
  if (value == null) return fallback

  if (Array.isArray(value)) {
    return value
      .map(String)
      .map((v) => v.trim())
      .filter(Boolean)
  }

  if (typeof value === 'string') {
    return value
      .split(',')
      .map((v) => v.trim())
      .filter(Boolean)
  }

  return fallback
}

function normalizeDepth(value) {
  if (value === Infinity || value === 'Infinity') return Infinity

  const n = Number(value)
  return Number.isFinite(n) && n > 0 ? n : CONFIG_DEFAULTS.depth
}

export function normalizeConfig(raw = {}) {
  const root = raw.root ? path.resolve(raw.root) : DEFAULT_ROOT

  // ⭐ 核心：支持 --no-only
  let only
  if (raw.only === false) {
    // commander: --no-only => only === false
    only = null
  } else {
    only = normalizeList(raw.only, CONFIG_DEFAULTS.only)
  }

  return {
    root,
    depth: normalizeDepth(raw.depth),
    bullet: raw.bullet ?? CONFIG_DEFAULTS.bullet,

    clipboard: Boolean(raw.clipboard),
    stdout: Boolean(raw.stdout),

    only,
    exclude: normalizeList(raw.exclude, CONFIG_DEFAULTS.exclude),

    output: raw.output ?? CONFIG_DEFAULTS.output,
    insertReadme:
      raw.insertReadme ?? raw.insert ?? CONFIG_DEFAULTS.insertReadme,

    start: raw.start ?? CONFIG_DEFAULTS.start,
    end: raw.end ?? CONFIG_DEFAULTS.end,

    dryRun: Boolean(raw.dryRun)
  }
}
