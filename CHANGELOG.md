# Changelog

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
