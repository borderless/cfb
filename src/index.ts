import { resolve } from "path";
import * as esbuild from "esbuild";

const OUTPUT_FILENAME = "worker.js";

export interface Options {
  entry: string[];
  output: string;
  minify?: boolean;
  sourceMap?: boolean;
  external?: string[];
  define?: Record<string, string>;
  mainFields?: string[];
  loader?: Record<
    string,
    "js" | "jsx" | "ts" | "tsx" | "json" | "text" | "base64" | "binary"
  >;
  inject?: string[];
  format?: "iife" | "esm";
}

/**
 * Simple build function for Cloudflare Worker scripts.
 */
export function build(options: Options) {
  return esbuild.build({
    bundle: true,
    splitting: false,
    format: options.format ?? "iife",
    minify: options.minify ?? true,
    platform: "browser",
    entryPoints: options.entry,
    outfile: resolve(options.output, OUTPUT_FILENAME),
    external: options.external,
    sourcemap: options.sourceMap,
    mainFields: options.mainFields,
    loader: options.loader,
    inject: options.inject,
    define: {
      "process.env.NODE_ENV": '"production"',
      ...options.define,
    },
  });
}
