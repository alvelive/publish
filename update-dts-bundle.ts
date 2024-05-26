import { readFile, writeFile } from 'fs/promises';
import { resolve } from 'path';

interface PackageJSON {
  dependencies?: Dependencies;
  devDependencies?: Dependencies;
}

interface Dependencies {
  [Dep: string]: string;
}

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
  return readFile(resolve(__dirname, ...segments), 'utf8').then(JSON.parse);
}

async function main() {
  const [{ dependencies, devDependencies }, dtsBundleConfig] =
    await Promise.all([
      load<PackageJSON>('./package.json'),
      load<DTSBundleGeneratorConfig>('dts-bundle.config.json'),
    ]);

  dtsBundleConfig.entries ??= [];
  dtsBundleConfig.entries = dtsBundleConfig.entries.map((entry) => {
    entry.libraries ??= {};
    entry.libraries.inlinedLibraries ??= [];
    entry.libraries.inlinedLibraries = entry.libraries.inlinedLibraries
      .concat(Object.keys(dependencies ?? {}))
      .concat(Object.keys(devDependencies ?? {}));

    return entry;
  });

  await writeFile(
    'dts-bundle.config.json',
    JSON.stringify(dtsBundleConfig, null, 2),
  );
}
