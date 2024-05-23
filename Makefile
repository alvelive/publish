ifndef ENTRY_POINT
$(error ENTRY_POINT is undefined)
endif

ifndef PLATFORM
$(error PLATFORM is undefined)
endif

all: clean build-source-cjs build-source-esm build-typings

clean:
	rm -rf ./dist
	bun install --frozen-lockfile

build-source-cjs:
	bunx --bun esbuild --bundle $(ENTRY_POINT) --platform=$(PLATFORM) --format=cjs --outdir=./dist/cjs --sourcemap=external

build-source-esm:
	bunx --bun esbuild --bundle $(ENTRY_POINT) --platform=$(PLATFORM) --format=esm --outdir=./dist/esm --sourcemap=external

build-typings:
	bunx --bun dts-bundle-generator --config dts-bundle.config.json
