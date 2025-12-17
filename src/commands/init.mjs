/**
 * @file: init.mjs
 * @description:
 * @author: King Monkey
 * @created: 2025-12-17 18:13
 */
import { confirm, input, select } from '@inquirer/prompts'
import path from 'path'

import { styles as ui } from '../ui/styles.mjs'
import { writeConfig } from '../utils/config.mjs'
import { formatOnlyForInput } from '../utils/formatters.mjs'
import { getInitDefaults } from '../utils/normalizeConfig.mjs'

export async function runInit() {
  const defaults = getInitDefaults()
  console.log(`
${ui.success(ui.bold('✨ Welcome to md-structure ✨'))}

This tool helps you generate clean, readable
Markdown directory structures for documentation.
`)

  const root = await input({
    message: ui.info('Project root directory:'),
    default: defaults.root
  })

  const depth = Number(
    await input({
      message: ui.info('Max directory depth:'),
      default: String(defaults.depth),
      validate: (v) =>
        Number.isFinite(Number(v)) && Number(v) > 0
          ? true
          : 'Depth must be a positive number'
    })
  )

  const bullet = await select({
    message: ui.info('Bullet style:'),
    choices: [
      { name: 'Tree (├──)', value: '├──' },
      { name: 'Markdown dash (-)', value: '-' },
      { name: 'Asterisk (*)', value: '*' }
    ],
    default: defaults.bullet
  })

  const enableOnly = await confirm({
    message: ui.info('Enable extension filtering?'),
    default: defaults.only !== null
  })

  let only = null

  if (enableOnly) {
    only = (
      await input({
        message: ui.info('Only include extensions (comma separated):'),
        default: formatOnlyForInput(defaults?.only)
      })
    )
      .split(',')
      .map((e) => e.trim())
      .filter(Boolean)
  }

  const exclude = (
    await input({
      message: ui.info('Exclude directories (comma separated):'),
      default: formatOnlyForInput(defaults?.exclude)
    })
  )
    .split(',')
    .map((e) => e.trim())
    .filter(Boolean)

  const output = await input({
    message: ui.info('Output file:'),
    default: defaults.output
  })

  const insertReadme = await confirm({
    message: ui.info('Insert into README.md?'),
    default: defaults.insertReadme
  })

  const config = {
    root: path.normalize(root),
    depth,
    bullet,
    only,
    exclude,
    output,
    insertReadme
  }

  const filePath = writeConfig(config)

  console.log(`
${ui.success('✔ Configuration saved')}
${ui.dim(filePath)}

Next step:
  ${ui.accent('md-structure generate')}
`)
}
