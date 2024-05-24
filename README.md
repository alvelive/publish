# npm Publish GitHub Action

## Overview

This action facilitates the publishing of npm packages (or GitHub Packages) with
minimal configuration. It handles dependency installation, building, and
publishing processes.

## Inputs

| Name                   | Description                                                                        | Required for Build | Required for Publish | Default                                                              |
| ---------------------- | ---------------------------------------------------------------------------------- | ------------------ | -------------------- | -------------------------------------------------------------------- |
| `entrypoint`           | Entry point for npm package                                                        | No                 | No                   | `src/index.ts`                                                       |
| `platform`             | Target platform for npm package                                                    | No                 | No                   | `node`                                                               |
| `install-scope`        | Dependency scope for npm dependencies                                              | No                 | No                   | `@alvelive`                                                          |
| `install-token`        | Access token for npm registry during installation (GitHub PAT for GitHub Packages) | No                 | No                   | Required if your package needs private packages during build/publish |
| `install-registry-url` | URL for npm registry during installation (GitHub PAT for GitHub Packages)          | No                 | No                   | `https://npm.pkg.github.com/`                                        |
| `publish`              | Should the action publish the image to the registry                                | No                 | Yes                  | `false`                                                              |
| `npm-token`            | Access token for npm registry (GitHub PAT for GitHub Packages)                     | No                 | Yes                  | Required if your package needs private packages during publish       |
| `registry-url`         | Registry URL for npm package                                                       | No                 | Yes                  | `https://npm.pkg.github.com/`                                        |
| `force`                | Force publish to registry                                                          | No                 | No                   | false                                                                |

## Usage

```yaml
name: Publish npm Package

on:
  push:
    branches:
      - main

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v2

      - name: Publish npm package
        uses: ./
        with:
          entrypoint: 'src/index.ts'
          platform: 'node'
          install-scope: '@your-scope'
          install-token: ${{ secrets.NPM_INSTALL_TOKEN }}
          install-registry-url: 'https://npm.pkg.github.com/'
          publish: true
          npm-token: ${{ secrets.NPM_TOKEN }}
          registry-url: 'https://npm.pkg.github.com/'
```

## Steps

1. **Check input values**
   - Validates the necessary inputs for building and publishing.
2. **Setup Bun**

   - Uses the `oven-sh/setup-bun@v1` action to set up Bun.

3. **Setup Node.js**

   - Uses the `actions/setup-node@v4` action to set up Node.js.

4. **Get Bun Cache Directory**

   - Retrieves the Bun cache directory for caching build tools.

5. **Cache Bun Build Tools**

   - Caches Bun build tools to speed up future builds.

6. **Download Build Scripts**

   - Downloads the required build scripts from the repository.

7. **Run Build Script**

   - Configures the package for private scope if provided and runs the build
     script.

8. **Publish to npm or GitHub Packages**
   - Publishes the package if the `publish` input is set to `true`.

## Environment Variables

- `ENTRY_POINT`: The entry point of the npm package.
- `PLATFORM`: The target platform for the npm package.
- `NPM_TOKEN`: The npm token for authentication.
- `PUBLISH`: Flag indicating if the package should be published.
- `REGISTRY_URL`: The registry URL for the npm package.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file
for details.

```

Feel free to adjust any sections as necessary to match your specific use case and preferences.
```
