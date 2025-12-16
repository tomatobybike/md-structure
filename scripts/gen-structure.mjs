import fs from 'fs';
import path from 'path';

const root = process.argv[2] || 'src';
const bullet = process.argv[3] || '-';
const ignore = new Set(['node_modules', '.git']);

function walk(dir, depth = 0) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    // eslint-disable-next-line no-continue
    if (ignore.has(entry.name)) continue;

    const indent = '  '.repeat(depth);
    const line = `${indent}${bullet} ${entry.name}`;
    console.log(line);

    if (entry.isDirectory()) {
      walk(path.join(dir, entry.name), depth + 1);
    }
  }
}

console.log(`${bullet} ${root}`);
walk(root, 1);
