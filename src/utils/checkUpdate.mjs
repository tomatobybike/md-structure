import boxen from 'boxen'
import fs from 'fs'
import isOnline from 'is-online'
import os from 'os'
import path from 'path'
import semver from 'semver'

import { isJsonMode, isQuietMode } from '../ui/runtime.mjs'
import { styles } from '../ui/styles.mjs'
import { isInteractiveTTY } from './tty.mjs'

const CACHE_DIR = path.join(os.homedir(), '.config', 'md-structure')
const CACHE_FILE = path.join(CACHE_DIR, 'update.json')
const INTERVAL = 24 * 60 * 60 * 1000

async function fetchLatest(pkg, timeout = 1500) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeout)

  try {
    const res = await fetch(`https://registry.npmjs.org/${pkg}/latest`, {
      signal: controller.signal
    })
    if (!res.ok) throw new Error()
    return (await res.json()).version
  } catch {
    return null
  } finally {
    clearTimeout(timer)
  }
}

export async function checkUpdate(pkg) {
  if (!isInteractiveTTY() || isQuietMode() || isJsonMode()) return

  if (!(await isOnline())) return

  let cache = {}
  try {
    cache = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'))
    // eslint-disable-next-line no-empty
  } catch {}

  const now = Date.now()
  if (cache.time && now - cache.time < INTERVAL) return

  const latest = await fetchLatest(pkg.name)

  if (!latest || !semver.lt(pkg.version, latest)) return

  fs.mkdirSync(CACHE_DIR, { recursive: true })
  fs.writeFileSync(CACHE_FILE, JSON.stringify({ time: now, latest }, null, 2))

  console.log(
    boxen(
      `${styles.dim('Update available')}  ${styles.dim(pkg.version)} → ${styles.success(latest)}\n` +
        `${styles.dim('Run')} ${styles.accent(`npm i -g ${pkg.name}`)} ${styles.dim('to update')}`,
      { padding: 1, borderStyle: 'round', borderColor: 'yellow' }
    )
  )
}
