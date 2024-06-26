PLATFORM ?= node
ENTRY_POINT ?= src/index.ts
BUILD_ARGS ?=

all: | clean install build

clean:
	rm -rf ./dist

install:
	bun install --frozen-lockfile

build:
	$(MAKE) -j build-cjs build-esm build-typings

build-cjs:
	bunx esbuild --bundle $(ENTRY_POINT) --platform=$(PLATFORM) --format=cjs --outdir=./dist/cjs --sourcemap=external --external:bun $(BUILD_ARGS)

build-esm:
	bunx esbuild --bundle $(ENTRY_POINT) --platform=$(PLATFORM) --format=esm --outdir=./dist/esm --sourcemap=external --external:bun $(BUILD_ARGS)

update-dts-config:
	bun run action/update-dts-config.ts

build-typings: update-dts-config
	bunx dts-bundle-generator --config dts-bundle.config.json
