import chalk from 'chalk'
import fs from 'fs'
import path from 'path'

import { generateStructure } from '../core/generateStructure.mjs'
import { insertIntoReadme } from '../insertIntoReadme.mjs'
import { configureLogger, logger } from '../ui/logger.mjs'
import { renderDryRun, renderJsonResult } from '../ui/render/generate.mjs'
import { readConfig } from '../utils/config.mjs'
import { normalizeConfig } from '../utils/normalizeConfig.mjs'

export function runGenerate(cliOptions) {
  configureLogger({ json: cliOptions.json })
  const rawConfig = {
    ...readConfig(),
    ...cliOptions
  }

  const config = normalizeConfig(rawConfig)

  try {
    const result = generateStructure(config)

    // ---------- JSON ----------
    if (config.json) {
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

    // ---------- DRY RUN ----------
    if (config.dryRun) {
      logger.info(renderDryRun(result))
      return
    }

    // ---------- WRITE FILE ----------
    const outputPath = path.resolve(process.cwd(), config.output)

    fs.writeFileSync(outputPath, result)

    console.log(
      chalk.green('✔ Structure written to ') + chalk.cyan(outputPath)
    )

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
