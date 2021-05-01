# cfb

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]
[![Build status][build-image]][build-url]
[![Build coverage][coverage-image]][coverage-url]

> Compile a Cloudflare Workers script into a single file.

## Installation

```sh
npm install @borderless/cfb --save-dev
```

## Usage

```sh
cfb --entry src/index.js --output worker
```

## TypeScript

This project is written using [TypeScript](https://github.com/Microsoft/TypeScript) and publishes the definitions directly to NPM.

## License

MIT

[npm-image]: https://img.shields.io/npm/v/@borderless/cfb
[npm-url]: https://npmjs.org/package/@borderless/cfb
[downloads-image]: https://img.shields.io/npm/dm/@borderless/cfb
[downloads-url]: https://npmjs.org/package/@borderless/cfb
[build-image]: https://img.shields.io/github/workflow/status/borderless/cfb/CI/main
[build-url]: https://github.com/borderless/cfb/actions/workflows/ci.yml?query=branch%3Amain
[coverage-image]: https://img.shields.io/codecov/c/gh/borderless/cfb
[coverage-url]: https://codecov.io/gh/borderless/cfb
