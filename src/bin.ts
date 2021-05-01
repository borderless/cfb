#!/usr/bin/env node

import arg from "arg";
import { build } from "./index";

const {
  "--define": define,
  "--entry": entry = ["index.js"],
  "--external": external,
  "--format": format,
  "--inject": inject,
  "--loader": loader,
  "--main-field": mainFields,
  "--minify": minify,
  "--output": output = "bundle",
  "--source-map": sourceMap,
} = arg({
  "--define": defineArgs(String),
  "--entry": [String],
  "--external": [String],
  "--format": validArg("iife", "esm"),
  "--inject": [String],
  "--loader": defineArgs(
    validArg("js", "jsx", "ts", "tsx", "json", "text", "base64", "binary")
  ),
  "--main-field": [String],
  "--minify": Boolean,
  "--output": String,
  "--source-map": Boolean,
  "-e": "--entry",
  "-o": "--output",
  "-s": "--source-map",
});

build({
  define,
  entry,
  external,
  format,
  inject,
  loader,
  mainFields,
  minify,
  output,
  sourceMap,
}).then(
  (stats) => {
    for (const warning of stats.warnings) {
      let message = warning.text;
      if (warning.location) {
        const { file, line, column } = warning.location;
        message = `${file}(${line},${column}): ${message}`;
      }
      console.warn(message);
    }
    process.exit(0);
  },
  (err) => {
    console.error(err);
    process.exit(1);
  }
);

/**
 * Process `--define` arguments.
 */
function defineArgs<T>(
  handler: arg.Handler<T>
): arg.Handler<Record<string, T>> {
  return (input, name, define = {}) => {
    const index = input.indexOf("=");
    if (index === -1) {
      throw new TypeError(`Definition must have a key and value: ${input}`);
    }
    const key = input.slice(0, index).trim();
    const value = input.slice(index + 1).trim();
    define[key] = handler(value, key);
    return define;
  };
}

/**
 * Validate the input arg is an expected string.
 */
function validArg<T extends string>(...valid: T[]): arg.Handler<T> {
  return (input, name) => {
    if (!valid.includes(input as any)) {
      throw new TypeError(`Invalid value for ${name}: ${input}`);
    }
    return input as T;
  };
}
