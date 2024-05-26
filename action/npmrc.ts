/* eslint-disable no-process-env */
import { writeFile } from 'fs/promises';
import { resolve } from 'path';

import { check } from './check-env';

const logger = console;

async function writeRC(
  name: string,
  content: string,
  scope: string,
): Promise<void> {
  const file = resolve(process.cwd(), name);

  logger.log(`Creating ${name} for private scope ${scope}`);

  content = content.trim();

  await writeFile(file, content);

  logger.log(`${content.length} bytes written to ${file}`);
}

async function main(): Promise<void> {
  const { INSTALL_REGISTRY_URL, INSTALL_SCOPE, INSTALL_TOKEN } = process.env;

  if (INSTALL_SCOPE) {
    const missing = check(`install from private scope ${INSTALL_SCOPE}`, {
      INSTALL_TOKEN,
      INSTALL_REGISTRY_URL,
    });

    if (missing) {
      process.exit(1);
    }

    const bunfig = `
      [install.scopes]
      "${INSTALL_SCOPE}" = { token = "${INSTALL_TOKEN}", url = "${INSTALL_REGISTRY_URL}" }
      `;

    const npmrc = `
      ${INSTALL_SCOPE}:registry=${INSTALL_REGISTRY_URL}
      //npm.pkg.github.com/:_authToken=${INSTALL_TOKEN}
      `;

    await Promise.all([
      writeRC('bunfig.toml', bunfig, INSTALL_SCOPE),
      writeRC('.npmrc', npmrc, INSTALL_SCOPE),
    ]);
  } else {
    logger.log('No private scope provided');
  }
}

void main();
