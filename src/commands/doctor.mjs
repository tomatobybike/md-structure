import fs from 'fs'
import path from 'path'

import { logger } from '../ui/logger.mjs'
import { renderDoctorResult } from '../ui/render/doctor.mjs'
import { isJsonMode } from '../ui/runtime.mjs'
import { readConfig } from '../utils/config.mjs'

export function runDoctor() {
  const results = []

  // 1. Config check
  try {
    readConfig()
    results.push({
      name: 'Config file',
      ok: true
    })
  } catch (e) {
    results.push({
      name: 'Config file',
      ok: false,
      message: e.message
    })
  }

  // 2. Root directory
  const root = 'src'
  if (fs.existsSync(root)) {
    results.push({
      name: `Root directory (${root})`,
      ok: true
    })
  } else {
    results.push({
      name: `Root directory (${root})`,
      ok: false,
      message: 'Directory not found'
    })
  }

  // 3. Output writable
  try {
    const testPath = path.resolve(process.cwd(), '.md-structure.tmp')
    fs.writeFileSync(testPath, 'test')
    fs.unlinkSync(testPath)
    results.push({
      name: 'Output directory writable',
      ok: true
    })
  } catch (e) {
    results.push({
      name: 'Output directory writable',
      ok: false,
      message: 'Permission denied'
    })
  }

  const ok = results.every((r) => r.ok)

  if (isJsonMode()) {
    console.log(JSON.stringify({ ok, results }, null, 2))
    return
  }

  // ---------- Render & Output ----------
  logger.raw(renderDoctorResult(results))

  const failed = results.filter((r) => !r.ok)

  if (failed.length) {
    logger.error('Some checks failed')
    process.exitCode = 1
  } else {
    logger.success('All checks passed')
  }
}
