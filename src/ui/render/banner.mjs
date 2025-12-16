import { styles } from '#src/ui/styles.mjs'

export function renderBanner() {
  return styles.title(`
 ███╗   ███╗██████╗       ███████╗████████╗
 ████╗ ████║██╔══██╗      ██╔════╝╚══██╔══╝
 ██╔████╔██║██║  ██║█████╗███████╗   ██║
 ██║╚██╔╝██║██║  ██║╚════╝╚════██║   ██║
 ██║ ╚═╝ ██║██████╔╝      ███████║   ██║
 ╚═╝     ╚═╝╚═════╝       ╚══════╝   ╚═╝

  Generate clean Markdown directory structures
`)
}
