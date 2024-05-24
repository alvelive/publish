import { readFile, writeFile } from 'fs/promises';
import { resolve } from 'path';

async function main(): Promise<void> {
  const path = resolve(__dirname, '..', '..', 'package.json');
  const json = await readFile(path, 'utf-8');
  const data = JSON.parse(json);

  data.version = parseInt(String(data.version).replace(/\d./g, '')) + 1;
  data.version = `1.0.${data.version}`;

  await writeFile(path, JSON.stringify(data, null, 2), 'utf-8');
}

void main();
