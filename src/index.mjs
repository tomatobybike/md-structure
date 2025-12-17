import { Command } from 'commander'

import { runDoctor } from './commands/doctor.mjs'
import { runGenerate } from './commands/generate.mjs'
import { runInit } from './commands/init.mjs'
import { bootstrapRuntime } from './ui/bootstrapRuntime.mjs'
import { renderBanner } from './ui/render/banner.mjs'
import { isQuietMode, setRuntime } from './ui/runtime.mjs'
import { checkUpdate } from './utils/checkUpdate.mjs'
import { getPackage } from './utils/pkg.mjs'
import { isInteractiveTTY } from './utils/tty.mjs'

const pkg = getPackage()

/* ---------- runtime ---------- */

bootstrapRuntime()

/* ---------- program ---------- */

const program = new Command()

program.name(pkg.name || 'md-structure')

// --help 时不显示 banner
let shouldShowBanner = true

program.on('--help', () => {
  shouldShowBanner = false
})

if (isInteractiveTTY() && shouldShowBanner && !isQuietMode()) {
  console.log(renderBanner())
}

checkUpdate(pkg).catch(() => {})

/* ---------------- commands ---------------- */

program
  .command('generate')
  .description('Generate structure markdown')
  .option('--dry-run', 'preview result without writing files')
  .option('-s,--stdout', 'output result to stdout instead of file')
  .option('-r, --root <dir>', 'root directory', '.')
  .option('-d, --depth <number>', 'max depth', (v) => parseInt(v, 10), Infinity)
  .option('-b, --bullet <symbol>', 'markdown bullet symbol e.g -,├──,*', '├──')
  .option('-o, --output <file>', 'output file', 'STRUCTURE.md')
  .option('-c, --clipboard', 'copy result to clipboard')
  .option('--only <exts>', 'only include extensions, e.g. .mjs,.ts')
  .option('--exclude <dirs>', 'exclude directories, e.g. test,dist')
  .option('-i,--insert', 'insert structure into README.md')
  .option('--start <marker>', 'README start marker', '<!-- STRUCTURE_START -->')
  .option('--end <marker>', 'README end marker', '<!-- STRUCTURE_END -->')
  .action(runGenerate)

program
  .command('init')
  .description('Interactive project initialization')
  .action(runInit)

program
  .command('doctor')
  .description('Check environment and configuration')
  .option('--json', 'output result as JSON')
  .action((options) => {
    setRuntime({ json: options.json })
    runDoctor(options)
  })

/* ---------------- default ---------------- */

program.parse(process.argv)
