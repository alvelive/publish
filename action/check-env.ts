/* eslint-disable no-process-env */
const logger = console;

function check(
  stage: string,
  dict: Record<string, unknown>,
): dict is Record<string, string> {
  let missing = false;

  for (const [name, value] of Object.entries(dict)) {
    if (value == null || String(value).trim() === '') {
      logger.error(`${name} is required to ${stage}`);
      missing = true;
    }
  }

  return missing;
}

async function main(): Promise<void> {
  let missing = false;
  const { ENTRY_POINT, PLATFORM, PUBLISH, NPM_TOKEN, REGISTRY_URL } =
    process.env;

  missing ||= check('run', { PUBLISH });
  missing ||= check('build', { ENTRY_POINT, PLATFORM });

  if (PUBLISH === 'true') {
    missing ||= check('publish', { NPM_TOKEN, REGISTRY_URL });
  }

  if (missing) {
    process.exit(1);
  }
}

void main();
