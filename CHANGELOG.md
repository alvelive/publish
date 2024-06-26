# Changelog

## [1.3.0](https://github.com/alvelive/publish/compare/v1.2.1...v1.3.0) (2024-06-26)


### Features

* **action-template:** only wget build scripts when there is not an existing one ([ca2a7af](https://github.com/alvelive/publish/commit/ca2a7afb34a08499df66efe8b6bb8a5973a42965))
* **action:** added build-args ([885fd27](https://github.com/alvelive/publish/commit/885fd279eebcfeaf76e7191fc1abd522a7f8d25b))
* **build:** auto add every dep into the inlined libraries ([69f59af](https://github.com/alvelive/publish/commit/69f59af01e4a8fba59fe86ecfb111e1f2fff431f))
* **template:** added clearing package.json dependencies to prevent any issues with pm ([3d2653a](https://github.com/alvelive/publish/commit/3d2653adb8e88f668066c96d7cdfdaf295b4a4b5))


### Bug Fixes

* **action-template:** invalid usage of inputs ([3f7d6ab](https://github.com/alvelive/publish/commit/3f7d6ab4277e2764cb0ba8728daefb31004cf159))
* **action:** build args is not being passed ([49e8927](https://github.com/alvelive/publish/commit/49e8927734ae52791a560cbbf42765b7c2c64df6))
* **action:** build args is not being passed ([bc76f33](https://github.com/alvelive/publish/commit/bc76f332201db73453b04928ac65a1ec157b3b49))
* **action:** fix typo ([32228aa](https://github.com/alvelive/publish/commit/32228aab6fc4ff52d0b352fd811dcb2f89852d4e))
* **action:** invalida rg pass ([2f340bd](https://github.com/alvelive/publish/commit/2f340bda1b23e8550d7c0496111195071d4d4a65))
* **build:** build action fails to resolve bun ([79d3d62](https://github.com/alvelive/publish/commit/79d3d628f22d4d63907faf787711b29d111e1525))
* **dts:** added events to allowed types ([03af0fd](https://github.com/alvelive/publish/commit/03af0fdb0196f6c635fa810951c0ff12e9ac808b))
* **dts:** added events to allowed types ([43c2ede](https://github.com/alvelive/publish/commit/43c2ede79ad761671832e1d365a6cf15ace4a031))
* **dts:** dts does not include libs without @types/* ([1e92c5a](https://github.com/alvelive/publish/commit/1e92c5a06426803c20f8e6cc598768e36f6acff6))
* **dts:** update-dts-config ([4a7c3df](https://github.com/alvelive/publish/commit/4a7c3df559ce2df0901b14f2dbbdba8fe0eb3a4b))
* **dts:** updated dts config ([885fd27](https://github.com/alvelive/publish/commit/885fd279eebcfeaf76e7191fc1abd522a7f8d25b))
* **esbuild:** Fix typo in Makefile for external bundler ([195f214](https://github.com/alvelive/publish/commit/195f214798bd0bd4d879afc77292d6ef5bc9adac))
* **Makefile:** removed --bun ([7ca4914](https://github.com/alvelive/publish/commit/7ca4914350e0314161a31378caf4d7ce81136716))
* **npmrc:** invalid check usage ([62e0cd4](https://github.com/alvelive/publish/commit/62e0cd42739d6573d4abe4df06fc85b3ee575bfc))
* **pkg:** added esbuild ([c92978b](https://github.com/alvelive/publish/commit/c92978b06c0ec09785825b2c9f066c3ef257f43b))
* **pm:** updated lockfile ([0ab5df3](https://github.com/alvelive/publish/commit/0ab5df3864bae60011c380705a52b1b7b7d036a8))
* **tpl:** download scripts in parallel ([26022b7](https://github.com/alvelive/publish/commit/26022b79189ace95888511d19ddf7dfbc3f01393))
* **types:** added types to inlinedLibraries ([4fd2a37](https://github.com/alvelive/publish/commit/4fd2a37b2c62770f931c287fdff187ada50d7d09))
* **update-dts-bundle.ts:** fix eslint issue with typing ([fd49acf](https://github.com/alvelive/publish/commit/fd49acf5a7fa1e098863b19bb52574ef291c31a1))
* **update-dts-bundle.ts:** main is not calld ([da1c0bb](https://github.com/alvelive/publish/commit/da1c0bb2478aed31877f6c05140a44c030d52867))
* **update-dts-config:** remove @types/ from inlineLibraries ([cc84a45](https://github.com/alvelive/publish/commit/cc84a45fd6fea5f6d22d998aac59c46f705cb9d0))

## [1.2.1](https://github.com/alvelive/publish/compare/v1.2.0...v1.2.1) (2024-05-24)


### Bug Fixes

* **action-template:** invalid env check ([c978353](https://github.com/alvelive/publish/commit/c978353c2e73254345f75c98a883e91cc2cf90cd))

## [1.2.0](https://github.com/alvelive/publish/compare/v1.1.0...v1.2.0) (2024-05-24)


### Features

* **action:** updated action to use npm-token input as a fallback for install-token (same as install-registry-url) ([584c501](https://github.com/alvelive/publish/commit/584c501d606c7bb83691f63c8a1f3dc3f28bb4c7))


### Bug Fixes

* **action-template:** invalid parse of instal token etc ([03c29a9](https://github.com/alvelive/publish/commit/03c29a97417fee34e60665bf7557882498f559f1))
* **action-template:** missing env for unpublish step ([47826f6](https://github.com/alvelive/publish/commit/47826f62b04ec087bf2afef06f9010d25bf963d5))
* **action-template:** npm publish force does not work with github packages ([f2470fe](https://github.com/alvelive/publish/commit/f2470fe8033b0454388f8595ea09f1a0923f3419))
* **workflow:** fix publish that needs the action to be updated ([6fadf26](https://github.com/alvelive/publish/commit/6fadf2654c78819c4a709f07d76a701b9e4b9577))
* **workflow:** update permissions for publish action ([59b4219](https://github.com/alvelive/publish/commit/59b4219d88bf0c4c68259ed9996f9c55b05ad8e7))

## [1.1.0](https://github.com/alvelive/publish/compare/v1.0.0...v1.1.0) (2024-05-24)


### Features

* **action:** added force publish option to prevent conflicts ([5266a4a](https://github.com/alvelive/publish/commit/5266a4a84b1f618a2add267dfada53816bd4fc8b))
* **readme:** updated readme ([8d51f5b](https://github.com/alvelive/publish/commit/8d51f5ba74d7b991acb01f75978feb1d6a6d0db1))

## 1.0.0 (2024-05-24)


### Features

* **release:** added release plesase ([5c39df5](https://github.com/alvelive/publish/commit/5c39df5b05f458e0812589875d3a4c2e7125d795))


### Bug Fixes

* **action-template:** added install scope and token support ([40642a3](https://github.com/alvelive/publish/commit/40642a33569605c551a6addabd669f0b94e0c998))
* **action:** build action ([c594acb](https://github.com/alvelive/publish/commit/c594acb65057be93cc2b75e71b6ba96eb9fcfa38))
* **action:** fixed github actions ([797027f](https://github.com/alvelive/publish/commit/797027f208716328c8c6d4051854896fe5365291))
* local usage outside a fn ([1c506e6](https://github.com/alvelive/publish/commit/1c506e66749364c296ac8edc7b0ddded4b50af8f))
* **workflow:** added rebase to git pull ([1b7a41c](https://github.com/alvelive/publish/commit/1b7a41ce95873ab29a1d98f320e0098aade65a6b))
* **workflow:** fixed build action to commit related branch ([8af0079](https://github.com/alvelive/publish/commit/8af0079bbde4b0807e0c9d7737820f03e40340e2))
* **workflow:** updated build action triggers ([b8dcc33](https://github.com/alvelive/publish/commit/b8dcc33622d5a31ed13088bb2637b919354f3b5b))
