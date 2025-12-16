import chalk from 'chalk'

export const renderHelp = (cmd) => {
  const commands = cmd.commands
    .filter((c) => !c._hidden)
    .map(
      (c) =>
        `  ${chalk.cyan(c.name().padEnd(12))}${chalk.gray(c.description())}`
    )
    .join('\n')

  const options = cmd.options
    .map(
      (o) => `  ${chalk.green(o.flags.padEnd(22))}${chalk.gray(o.description)}`
    )
    .join('\n')

  return `
${chalk.bold('Usage')}
  ${cmd.name()} [command] [options]

${chalk.bold('Commands')}
${commands || chalk.dim('  (no commands)')}

${chalk.bold('Options')}
${options || chalk.dim('  (no options)')}
`
}
