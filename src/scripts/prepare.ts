import { basename, dirname } from 'path';

import { $ } from 'bun';

async function main(): Promise<void> {
  const parent = dirname(__dirname);

  if (basename(parent) === 'node_modules' || parent === '/home/runner/work') {
    process.exit(0);
  }

  await $`npx husky`;
}

void main();
