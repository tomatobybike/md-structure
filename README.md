<p align="center">
  <img src="./images/logo.svg" width="600" />
</p>

# md-structure

Generate clean, readable Markdown directory structures.

A small, focused CLI tool for turning your project folders into **well-formatted Markdown structure docs** — suitable for READMEs, documentation, code reviews, and AI context.

<p align="center">
  <a href="https://www.npmjs.com/package/md-structure">
    <img src="https://img.shields.io/npm/v/md-structure.svg" alt="npm version">
  </a>
  <a href="https://www.npmjs.com/package/md-structure">
    <img src="https://img.shields.io/npm/dm/md-structure.svg" alt="downloads">
  </a>
  <a href="https://github.com/tomatobybike/md-structure/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/tomatobybike/md-structure.svg" alt="license">
  </a>
  <a href="https://github.com/tomatobybike/md-structure">
    <img src="https://img.shields.io/github/stars/tomatobybike/md-structure.svg?style=social" alt="GitHub stars">
  </a>
  <a href="https://github.com/tomatobybike/md-structure/issues">
    <img src="https://img.shields.io/github/issues/tomatobybike/md-structure.svg" alt="issues">
  </a>
</p>

---

### English | [简体中文](./README.zh-CN.md)

---

## ✨ Features

- ✅ Cross-platform (Windows / macOS / Linux)
- 📁 Generate clean, readable Markdown directory trees
- 🧾 Standard Markdown list output (README & docs friendly)
- 🎯 Directory-first sorting (folders before files)
- 📏 Max depth limit (`--depth`)
- 🔍 Extension filtering (`--only`)
- 🚫 Directory exclusion (`--exclude`)
- 🧩 Auto insert into README via markers
- 🧪 Dry-run preview mode (`--dry-run`)
- 🤖 Machine-readable JSON output (`--json`)
- 🩺 Built-in `doctor` self-check command
- ⚡ Zero runtime dependencies _(except `commander`)_

---

## 📦 Installation

```bash
npm i -g md-structure
```

```bash
yarn global add md-structure
```

Or use without installing:

```bash
npx md-structure generate
```

---

## 🚀 Usage

### Generate directory structure

```bash
md-structure generate
```

## Command options

### generate

| Option | Description | Default |
|------|-------------|---------|
| `--dry-run` | Preview result without writing files | `false` |
| `-s, --stdout` | Output result to stdout instead of file | `false` |
| `-c, --clipboard` | Copy result to clipboard | `false` |
| `-r, --root <dir>` | Root directory to scan | `.` |
| `-d, --depth <number>` | Max directory depth | `Infinity` |
| `-b, --bullet <symbol>` | Markdown bullet symbol | `├──` |
| `-o, --output <file>` | Output file | `STRUCTURE.md` |
| `--only <exts>` | Only include extensions | — |
| `--exclude <dirs>` | Exclude directories | — |
| `-i, --insert` | Insert structure into README | `false` |
| `--start <marker>` | README start marker | `<!-- STRUCTURE_START -->` |
| `--end <marker>` | README end marker | `<!-- STRUCTURE_END -->` |

---

### Preview only (dry run)

```bash
md-structure generate --dry-run
```

---

### JSON output (for CI / scripts)

```bash
md-structure generate --json
```

---

## 📤 Output to stdout (recommended)

By default, `md-structure generate` writes the result to a file
(e.g. `STRUCTURE.md`).

If you want **stdout-only output**, use:

```bash
md-structure generate --stdout
```

### Common use cases

#### Pipe to other commands

```bash
md-structure generate --stdout | pbcopy   # macOS
md-structure generate --stdout | clip     # Windows
md-structure generate --stdout | xclip    # Linux
```

#### Redirect to a file

```bash
md-structure generate --stdout > STRUCTURE.md
```

#### Scripts / CI

```bash
md-structure generate --stdout --json
```

### Behavior notes

-   When using `--stdout`:

    -   ❌ No files are written

    -   ❌ No README insertion is performed

    -   ✅ Output is written to stdout only

-   Ideal for:

    -   CI pipelines

    -   Shell scripting

    -   Editor or Web integrations


---

## 🧠 Why stdout matters

`md-structure` intentionally treats **stdout as a first-class output**.

This design follows the **Unix philosophy**:

> *Write programs that do one thing well, and work together.*

By supporting `--stdout`:

-   `md-structure` becomes composable

-   Output can be piped, transformed, copied, or stored

-   No assumptions are made about your workflow


Examples:

```bash
# Copy structure directly
md-structure generate --stdout | pbcopy

# Transform or post-process
md-structure generate --stdout | sed 's/src/source/'

# Use inside scripts
STRUCTURE=$(md-structure generate --stdout)
```

This makes `md-structure` suitable for:

-   CI systems

-   Editor extensions

-   Web tools

-   AI-assisted workflows


`md-structure` generates structure —
**what you do with it is up to you**.

---

## 🩺 Doctor


Check environment and configuration.

| Option | Description |
|------|-------------|
| `--json` | Output machine-readable JSON result |


```bash
md-structure doctor
```

Machine-readable output:

```bash
md-structure doctor --json
```

---

## 🧠 Configuration

Create `md-structure.config.json`:

```json
{
  "root": "src",
  "depth": Infinity,
  "only": [".mjs", ".ts"],
  "exclude": ["node_modules", "dist", "test"],
  "output": "STRUCTURE.md",
  "insert": true,
  "start": "<!-- STRUCTURE_START -->",
  "end": "<!-- STRUCTURE_END -->"
}
```

CLI options always override config values.

---

## 📌 Insert into README

Add markers to your README:

```md
<!-- STRUCTURE_START -->
<!-- STRUCTURE_END -->
```

Then run:

```bash
md-structure generate --insert
```

---

## 🤫 Quiet & JSON behavior

-   `--json` automatically implies quiet mode

-   No banners or extra UI output in machine-readable mode


---

## 📄 License

[MIT](./LICENSE)

---

## 🔍 Keywords

<!-- cli, markdown, directory, structure, tree, readme -->
