import { styles } from './styles.mjs'
import { isQuietMode } from './runtime.mjs'

import { isInteractiveTTY } from '../utils/tty.mjs'

let config = {
  quiet: false,
  json: false,
}

export function configureLogger(opts = {}) {
  config = { ...config, ...opts }
}

function out(fn, msg) {
  if (isQuietMode()) return
  if (!isInteractiveTTY()) return
  console.log(fn(msg))
}

export const logger = {
  info(msg) {
    out(styles.info, `ℹ ${msg}`)
  },
  success(msg) {
    out(styles.success, `✔ ${msg}`)
  },
  warn(msg) {
    out(styles.warn, `⚠ ${msg}`)
  },
  error(msg) {
    console.error(styles.error(`✖ ${msg}`))
  },
  raw(msg) {
    console.log(msg)
  },
}
