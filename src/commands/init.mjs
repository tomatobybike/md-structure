import inquirer from 'inquirer';
import path from 'path';
import { styles as ui } from '../ui/styles.mjs';
import { writeConfig } from '../utils/config.mjs';



export async function runInit() {
  console.log(`
${ui.success(ui.bold('✨ Welcome to md-structure ✨'))}

This tool helps you generate clean, readable
Markdown directory structures for documentation.
`);

  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'root',
      message: ui.info('Project root directory:'),
      default: '.',
    },
    {
      type: 'number',
      name: 'depth',
      message: ui.info('Max directory depth:'),
      default: 5,
      validate: (v) => (v > 0 ? true : 'Depth must be > 0'),
    },
    {
      type: 'list',
      name: 'format',
      message: ui.info('Output style:'),
      choices: [
        { name: 'Markdown list (-)', value: 'markdown' },
        { name: 'Tree (├──)', value: 'tree' },
        { name: 'Plain text', value: 'text' },
      ],
    },
    {
      type: 'input',
      name: 'only',
      message: ui.info('Only include extensions:'),
      default: '.mjs,.ts',
      filter: (v) => v.split(',').map((e) => e.trim()).filter(Boolean),
    },
    {
      type: 'input',
      name: 'exclude',
      message: ui.info('Exclude directories:'),
      default: 'node_modules,dist,test',
      filter: (v) => v.split(',').map((e) => e.trim()).filter(Boolean),
    },
    {
      type: 'input',
      name: 'output',
      message: ui.info('Output file:'),
      default: 'STRUCTURE.md',
    },
    {
      type: 'confirm',
      name: 'insertReadme',
      message: ui.info('Insert into README.md?'),
      default: true,
    },
  ]);

  const config = {
    root: path.normalize(answers.root),
    depth: answers.depth,
    format: answers.format,
    only: answers.only,
    exclude: answers.exclude,
    output: answers.output,
    insertReadme: answers.insertReadme,
  };

  const filePath = writeConfig(config);

  console.log(`
${ui.success('✔ Configuration saved')}
${ui.dim(filePath)}

Next step:
  ${ui.accent('md-structure generate')}
`);
}
