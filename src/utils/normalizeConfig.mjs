import path from 'path'
import process from 'process'

const DEFAULT_ROOT = process.cwd()

const DEFAULTS = {
  root: '.',
  depth: Infinity,
  bullet: '├──',
  output: 'STRUCTURE.md',
  only: null,
  exclude: ['node_modules', '.git'],
  insertReadme: true,
  start: '<!-- STRUCTURE_START -->',
  end: '<!-- STRUCTURE_END -->',
  dryRun: false
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
  if (value === Infinity) return Infinity
  if (value === 'Infinity') return Infinity

  const n = Number(value)
  return Number.isFinite(n) && n > 0 ? n : DEFAULTS.depth
}

export function normalizeConfig(raw = {}) {
  const root = raw.root ? path.resolve(raw.root) : DEFAULT_ROOT
  return {
    root,
    depth: normalizeDepth(raw.depth),
    bullet: raw.bullet ?? DEFAULTS.bullet,

    only: normalizeList(raw.only, null),
    exclude: normalizeList(raw.exclude, DEFAULTS.exclude),

    output: raw.output ?? DEFAULTS.output,
    insertReadme: raw.insertReadme ?? raw.insert ?? DEFAULTS.insertReadme,

    start: raw.start ?? DEFAULTS.start,
    end: raw.end ?? DEFAULTS.end,

    dryRun: Boolean(raw.dryRun)
  }
}
