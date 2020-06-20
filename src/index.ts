#!/usr/bin/env node

import bytes from "bytes";
import webpack from "webpack";
import { resolve } from "path";

const WEBPACK_OUTPUT_FILENAME = "worker.js";
const WEBPACK_OUTPUT_SOURCE_MAP_FILENAME = WEBPACK_OUTPUT_FILENAME + ".map";

export interface Options {
  entry: string;
  output: string;
  sourceMap?: boolean;
}

/**
 * Simple build function for Cloudflare Worker scripts.
 */
export function build({
  entry,
  output,
  sourceMap,
}: Options): Promise<webpack.Stats> {
  const config: webpack.Configuration = {
    mode: "production",
    entry: resolve(entry),
    target: "webworker",
    optimization: {
      splitChunks: false,
    },
    output: {
      path: resolve(output),
      filename: WEBPACK_OUTPUT_FILENAME,
      sourceMapFilename: WEBPACK_OUTPUT_SOURCE_MAP_FILENAME,
    },
    performance: {
      maxAssetSize: bytes("1mb"),
      maxEntrypointSize: bytes("1mb"),
    },
    devtool: sourceMap ? "hidden-source-map" : false,
  };

  const compiler = webpack(config);

  return new Promise((resolve, reject) => {
    return compiler.run((err, stats) => (err ? reject(err) : resolve(stats)));
  });
}
