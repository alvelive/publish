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
     * Add @types/* dependencies to allowedTypesLibraries
     */
    entry.libraries.allowedTypesLibraries = [
      ...entry.libraries.allowedTypesLibraries,
      ...allDependencies.filter((item) => item.startsWith('@types/')),
    ];

    /**
     * Remove duplicates
     */
    entry.libraries.allowedTypesLibraries =
      entry.libraries.allowedTypesLibraries.filter(
        (value, index, array) => array.indexOf(value) === index,
      );

    /**
     * Add dependencies to inlinedLibraries
     */
    entry.libraries.inlinedLibraries = [
      ...entry.libraries.inlinedLibraries,
      ...allDependencies.filter((item) => !item.startsWith('@types/')),
    ];

    /**
     * Remove duplicates
     */
    entry.libraries.inlinedLibraries = entry.libraries.inlinedLibraries.filter(
      (value, index, array) => array.indexOf(value) === index,
    );

    return entry;
  });

  await writeFile(
    'dts-bundle.config.json',
    JSON.stringify(dtsBundleConfig, null, 2),
  );
}

void main();
