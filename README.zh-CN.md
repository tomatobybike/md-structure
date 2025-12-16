<p align="center">
  <img src="./images/logo.svg" width="600" />
</p>

# md-structure

生成 **清晰、优雅的 Markdown 目录结构**。

`md-structure` 是一个专注、克制的 CLI 工具，用于将项目目录转换为 **可读性极高的 Markdown 结构文档**，非常适合用于 README、文档、代码审查以及 AI 上下文。

<p align="center">
  <a href="https://www.npmjs.com/package/md-structure"><img src="https://img.shields.io/npm/v/md-structure.svg" alt="npm version"></a>
  <a href="https://www.npmjs.com/package/md-structure"><img src="https://img.shields.io/npm/dm/md-structure.svg" alt="downloads"></a>
  <a href="https://github.com/tomatobybike/md-structure/blob/master/LICENSE"><img src="https://img.shields.io/github/license/tomatobybike/md-structure.svg" alt="license"></a>
  <a href="https://github.com/tomatobybike/md-structure"><img src="https://img.shields.io/github/stars/tomatobybike/md-structure.svg?style=social" alt="GitHub stars"></a>
  <a href="https://github.com/tomatobybike/md-structure/issues"><img src="https://img.shields.io/github/issues/tomatobybike/md-structure.svg" alt="issues"></a>
</p>

---

## 中文 | [English](./README.md)

---

## 🌍 语言

- 中文（当前）
- [English](README.md)

---

## ✨ 特性

- ✅ 跨平台支持（Windows / macOS / Linux）
- 📁 生成清晰、易读的 Markdown 目录结构
- 🧾 标准 Markdown 列表输出（适合 README / 文档）
- 🎯 目录优先排序（文件夹在前）
- 📏 最大深度限制（`--depth`）
- 🔍 按扩展名过滤文件（`--only .mjs,.ts`）
- 🚫 排除指定目录（`--exclude test,dist`）
- 🧩 自动插入到 README 指定标记
- 🧪 Dry-run 预览模式（不写文件）
- 🤖 JSON 机器可读输出（`--json`）
- 🩺 内置 `doctor` 自检命令
- ⚡ 零运行时依赖（仅依赖 `commander`）

---

## 📦 安装

```bash
npm i -g md-structure
```

```bash
yarn global add md-structure
```

或直接使用：

```bash
npx md-structure generate
```

---

## 🚀 使用方法

### 生成目录结构

```bash
md-structure generate
```

常用参数示例：

```bash
md-structure generate \
  --root src \
  --depth 3 \
  --only .mjs,.ts \
  --exclude test,dist \
  --output STRUCTURE.md
```

### 仅预览（不写文件）

```bash
md-structure generate --dry-run
```

### JSON 输出（用于 CI / 脚本）

```bash
md-structure generate --json
```

---

## 🩺 Doctor 自检

检查运行环境和配置：

```bash
md-structure doctor
```

机器可读输出：

```bash
md-structure doctor --json
```

---

## 🧠 配置文件

创建 `md-structure.config.json`：

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

命令行参数会覆盖配置文件中的值。

---

## 📌 插入到 README

在 README 中添加标记：

```md
<!-- STRUCTURE_START -->
<!-- STRUCTURE_END -->
```

然后执行：

```bash
md-structure generate --insert
```

---

## 🤫 Quiet / JSON 模式

- 使用 `--json` 时会自动进入 quiet 模式
- 不输出 banner 和多余文本，适合自动化场景

---

## 📄 许可证

[MIT](./LICENSE)

---

## 🔍 关键词

<!-- cli, markdown, directory, structure ,tree ,readme  -->
