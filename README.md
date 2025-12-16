<p align="center">
  <img src="./images/logo.svg" width="600" />
</p>

# md-structure

Generate clean, readable Markdown directory structures.

A small, focused CLI tool for turning your project folders into **well‑formatted Markdown structure docs** — suitable for READMEs, docs, reviews, and AI context.

<p align="center">
  <a href="https://www.npmjs.com/package/md-structure"><img src="https://img.shields.io/npm/v/md-structure.svg" alt="npm version"></a>
  <a href="https://www.npmjs.com/package/md-structure"><img src="https://img.shields.io/npm/dm/md-structure.svg" alt="downloads"></a>
  <a href="https://github.com/tomatobybike/md-structure/blob/master/LICENSE"><img src="https://img.shields.io/github/license/tomatobybike/md-structure.svg" alt="license"></a>
  <a href="https://github.com/tomatobybike/md-structure"><img src="https://img.shields.io/github/stars/tomatobybike/md-structure.svg?style=social" alt="GitHub stars"></a>
  <a href="https://github.com/tomatobybike/md-structure/issues"><img src="https://img.shields.io/github/issues/tomatobybike/md-structure.svg" alt="issues"></a>
</p>

---

## English | [简体中文](./README.zh-CN.md)

---

## ✨ Features

- ✅ Cross-platform (Windows / macOS / Linux)
- 📁 Generate clean, readable Markdown directory trees
- 🧾 Standard Markdown list output (README & docs friendly)
- 🎯 Directory-first sorting (folders before files)
- 📏 Max depth limit (`--depth`)
- 🔍 Extension filtering (`--only .mjs,.ts`)
- 🚫 Directory exclusion (`--exclude test,dist`)
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

or use without installing:

```bash
npx md-structure generate
```

---

## 🚀 Usage

### Generate structure

```bash
md-structure generate
```

Common options:

```bash
md-structure generate \
  --root src \
  --depth 3 \
  --only .mjs,.ts \
  --exclude test,dist \
  --output STRUCTURE.md
```

### Dry run (preview only)

```bash
md-structure generate --dry-run
```

### JSON output (for CI / scripts)

```bash
md-structure generate --json
```

---

## 🩺 Doctor

Check environment and configuration:

```bash
md-structure doctor
```

Machine‑readable output:

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

## 🤫 Quiet & JSON modes

- `--json` automatically implies quiet mode
- No banners or UI noise in machine output

---

## 📄 License

[MIT](./LICENSE)

---

## 🔍 Keywords

<!-- cli, markdown, directory, structure ,tree ,readme  -->
