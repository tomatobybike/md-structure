import chalk from 'chalk'
import fs from 'fs'
import path from 'path'

import { generateStructure } from '../core/generateStructure.mjs'
import { insertIntoReadme } from '../insertIntoReadme.mjs'
import { configureLogger, logger } from '../ui/logger.mjs'
import { renderDryRun, renderJsonResult } from '../ui/render/generate.mjs'
import { copyToClipboard } from '../utils/clipboard.mjs'
import { readConfig } from '../utils/config.mjs'
import { normalizeConfig } from '../utils/normalizeConfig.mjs'

/*
stdout > dry-run > insert > write file
*/

export async function runGenerate(cliOptions) {
  configureLogger({ json: cliOptions.json })
  const rawConfig = {
    ...readConfig(),
    ...cliOptions
  }

  const config = normalizeConfig(rawConfig)

  try {
    const result = generateStructure(config)

    // 1️⃣ stdout 优先（最高优先级）
    if (config.stdout) {
      process.stdout.write(result)
      return
    }

    // ---------- JSON ----------
    if (config.json) {
      // ❌ JSON + clipboard 不兼容
      if (config.clipboard) {
        logger.error('--clipboard cannot be used with --json')
        process.exit(1)
      }
      console.log(
        renderJsonResult({
          root: config.root,
          output: config.output,
          dryRun: config.dryRun,
          length: result.split('\n').length
        })
      )
      return
    }

    // ---------- DRY RUN ：只展示----------
    if (config.dryRun) {
      if (config.clipboard) {
        await copyToClipboard(result)
        logger.success('Structure copied to clipboard')
        return
      }
      logger.info(renderDryRun(result))
      return
    }

    // ---------- WRITE FILE  默认：写文件 ----------
    const outputPath = path.resolve(process.cwd(), config.output)

    fs.writeFileSync(outputPath, result)

    console.log(
      chalk.green('✔ Structure written to ') + chalk.cyan(outputPath)
    )

    if (config.clipboard) {
      await copyToClipboard(result)
      logger.success('Structure copied to clipboard')
    }

    // ---------- INSERT README insert 模式 ----------
    if (config.insertReadme) {
      insertIntoReadme({
        content: result,
        start: config.start,
        end: config.end
      })
    }
  } catch (err) {
    logger.error(err.message)
    process.exit(1)
  }
}
