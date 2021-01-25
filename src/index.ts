#!/usr/bin/env node

import { resolve } from "path";
import * as esbuild from "esbuild";
import { ExternalsPlugin } from "webpack";

const OUTPUT_FILENAME = "worker.js";

export interface Options {
  entry: string;
  output: string;
  sourceMap?: boolean;
  external?: string[];
  define?: Record<string, string>;
}

/**
 * Simple build function for Cloudflare Worker scripts.
 */
export function build({ entry, output, sourceMap, external, define }: Options) {
  return esbuild.build({
    bundle: true,
    splitting: false,
    minify: true,
    platform: "browser",
    entryPoints: [entry],
    outfile: resolve(output, OUTPUT_FILENAME),
    external: external,
    sourcemap: sourceMap,
    define: {
      "process.env.NODE_ENV": '"production"',
      ...define,
    },
  });
}
