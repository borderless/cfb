#!/usr/bin/env node

import arg from "arg";
import { build } from "./index";

const {
  "--define": define,
  "--entry": entry = ["index.js"],
  "--external": external,
  "--inject": inject,
  "--main-field": mainFields,
  "--minify": minify,
  "--output": output = "bundle",
  "--source-map": sourceMap,
} = arg({
  "--define": defineArgs,
  "--entry": [String],
  "--external": [String],
  "--inject": [String],
  "--main-field": [String],
  "--minify": Boolean,
  "--output": String,
  "--source-map": Boolean,
  "-e": "--entry",
  "-o": "--output",
  "-s": "--source-map",
});

build({
  entry,
  output,
  sourceMap,
  external,
  define,
  mainFields,
  minify,
  inject,
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
function defineArgs(
  value: string,
  name: string,
  define: Record<string, string> = {}
) {
  const index = value.indexOf("=");
  if (index === -1) {
    throw new TypeError(`Definition must have a key and value: ${value}`);
  }
  define[value.slice(0, index).trim()] = value.slice(index + 1).trim();
  return define;
}
