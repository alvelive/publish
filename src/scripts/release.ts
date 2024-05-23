import { readFile, writeFile } from 'fs/promises';
import { resolve } from 'path';

async function main(): Promise<void> {
  const path = resolve(__dirname, '..', '..', 'package.json');
  const json = await readFile(path, 'utf-8');
  const data = JSON.parse(json);

  data.version = parseFloat(data.version) + 0.1;

  if (isNaN(data.version)) {
    throw new Error('Invalid version number');
  }

  data.version = data.version.toFixed(1);

  await writeFile(path, JSON.stringify(data, null, 2), 'utf-8');
}

void main();
