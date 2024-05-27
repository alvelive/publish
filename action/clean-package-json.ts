import { readFile, writeFile } from 'fs/promises';
import { resolve } from 'path';

const logger = console;

interface PackageJSON {
  dependencies?: Dependencies;
  devDependencies?: Dependencies;
}

type Dependencies = Record<string, string>;

async function load<T>(...segments: string[]): Promise<T> {
  const file = resolve(process.cwd(), ...segments);

  logger.log(`Loading file: ${file}`);

  const content = await readFile(file, 'utf8');

  logger.log(`File loaded: ${file} (${content.length} bytes)`);

  return JSON.parse(content);
}

async function main(): Promise<void> {
  const packageJSON = await load<PackageJSON>('./package.json');

  const dependencies = Object.keys(packageJSON.dependencies ?? {});
  const devDependencies = Object.keys(packageJSON.devDependencies ?? {});
  const hasDependency = !!(dependencies.length || devDependencies.length);

  if (!hasDependency) {
    logger.warn('No dependency found in package.json');

    return;
  }

  if (dependencies.length) {
    logger.log(`Removing ${dependencies.length} dependencies`);
    delete packageJSON.dependencies;
  }

  if (devDependencies.length) {
    logger.log(`Removing ${devDependencies.length} devDependencies`);
    delete packageJSON.devDependencies;
  }

  await writeFile('package.json', JSON.stringify(packageJSON, null, 2));
}

void main();
