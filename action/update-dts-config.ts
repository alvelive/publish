import { readFile, writeFile } from 'fs/promises';
import { resolve } from 'path';

const logger = console;

interface PackageJSON {
  dependencies?: Dependencies;
  devDependencies?: Dependencies;
}

type Dependencies = Record<string, string>;

interface DTSBundleGeneratorConfig {
  compilationOptions?: CompilationOptions;
  entries?: Entry[];
}

interface CompilationOptions {
  followSymlinks?: boolean;
  preferredConfigPath?: string;
}

interface Entry {
  filePath?: string;
  outFile?: string;
  failOnClass?: boolean;
  noCheck?: boolean;
  libraries?: Libraries;
  output?: Output;
}

interface Libraries {
  allowedTypesLibraries?: string[];
  importedLibraries?: string[];
  inlinedLibraries?: string[];
}

interface Output {
  inlineDeclareGlobals?: boolean;
  sortNodes?: boolean;
  umdModuleName?: string;
  inlineDeclareExternals?: boolean;
  noBanner?: boolean;
  respectPreserveConstEnum?: boolean;
  exportReferencedTypes?: boolean;
}

function uniq(): (value: string, index: number, array: string[]) => boolean {
  return function <T, U extends T[]>(
    value: T,
    index: keyof U,
    array: U,
  ): boolean {
    return array.indexOf(value) === index;
  };
}

function replace(
  needle: string | RegExp,
  replacement: string,
): (haystack: string) => string {
  return function <T extends string>(haystack: T): string {
    return haystack.replace(needle, replacement);
  };
}

function startsWith(needle: string): (haystack: string) => boolean {
  return function <T extends string>(haystack: T): boolean {
    return haystack.startsWith(needle);
  };
}

async function load<T>(...segments: string[]): Promise<T> {
  const file = resolve(process.cwd(), ...segments);

  logger.log(`Loading file: ${file}`);

  const content = await readFile(file, 'utf8');

  logger.log(`File loaded: ${file} (${content.length} bytes)`);

  return JSON.parse(content);
}

async function main(): Promise<void> {
  const [packageJSON, dtsBundleConfig] = await Promise.all([
    load<PackageJSON>('./package.json'),
    load<DTSBundleGeneratorConfig>('dts-bundle.config.json'),
  ]);

  if (!dtsBundleConfig.entries) {
    logger.warn('No entries found in dts-bundle.config.json');

    return;
  }

  const dependencies = Object.keys(packageJSON.dependencies ?? {});
  const devDependencies = Object.keys(packageJSON.devDependencies ?? {});
  const hasDependency = !!(dependencies.length || devDependencies.length);

  if (!hasDependency) {
    logger.warn('No dependency found in package.json');

    return;
  }

  if (dependencies.length) {
    logger.log(`${dependencies.length} dependencies found`);
  }

  if (devDependencies.length) {
    logger.log(`${devDependencies.length} devDependencies found`);
  }

  const allDependencies = [...dependencies, ...devDependencies].filter(
    (item) => !(item === '@types/node' || item === '@types/bun'),
  );

  logger.log('Updating inlinedLibraries with dependencies...');

  dtsBundleConfig.entries ??= [];
  dtsBundleConfig.entries = dtsBundleConfig.entries.map((entry) => {
    entry.libraries ??= {};
    entry.libraries.inlinedLibraries ??= [];
    entry.libraries.allowedTypesLibraries ??= [];

    /**
     * Add @types/node modules to importedLibraries
     */
    entry.libraries.importedLibraries ??= [];
    entry.libraries.importedLibraries = [
      ...entry.libraries.importedLibraries,
      'events',
    ].filter(uniq());

    const appendLibraries = allDependencies
      .concat(
        allDependencies
          .filter(startsWith('@types/'))
          .map(replace('@types/', '')),
      )
      .filter(uniq());

    /**
     * Add @types/* dependencies to allowedTypesLibraries
     */
    entry.libraries.allowedTypesLibraries = [
      ...entry.libraries.allowedTypesLibraries,
      ...appendLibraries,
    ].filter(uniq());

    /**
     * Add dependencies to inlinedLibraries
     */
    entry.libraries.inlinedLibraries = [
      ...entry.libraries.inlinedLibraries,
      ...appendLibraries,
    ].filter(uniq());

    /**
     * Remove duplicates
     */
    entry.libraries.inlinedLibraries =
      entry.libraries.inlinedLibraries.filter(uniq());

    return entry;
  });

  await writeFile(
    'dts-bundle.config.json',
    JSON.stringify(dtsBundleConfig, null, 2),
  );
}

void main();
