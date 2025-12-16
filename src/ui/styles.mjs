import chalk from 'chalk'

export const styles = {
  // 主色（和 logo / badge 统一）
  title: chalk.hex('#6B5BFF').bold,
  accent: chalk.hex('#8A6BFF'),

  info: chalk.cyanBright,
  success: chalk.greenBright,
  warn: chalk.yellowBright,
  error: chalk.redBright,

  // 辅助
  dim: chalk.gray,
  bold: chalk.bold,
}
