import { resolve } from 'path';

import { $ } from 'bun';

import { logger } from './logger';

async function main(): Promise<void> {
  const [script, ...rest] = process.argv.slice(2);
  const args = rest.join(' ');

  const path = resolve(__dirname, `${script}.ts`);
  const command = `bun ${path} ${args}`;

  logger.log(`Executing ${command}`);

  await $`bun run ${path} ${args}`;
}

void main();
