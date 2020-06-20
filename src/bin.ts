#!/usr/bin/env node

import arg from "arg";
import { build } from "./index";

const {
  "--entry": entry = "index.js",
  "--output": output = "bundle",
  "--source-map": sourceMap,
} = arg({
  "--entry": String,
  "--output": String,
  "--source-map": Boolean,
  "-e": "--entry",
  "-o": "--output",
  "-s": "--source-map",
});

build({ entry, output, sourceMap }).then(
  (stats) => {
    console.log(stats.toString("normal"));
    process.exit(stats.hasErrors() ? 1 : 0);
  },
  (err) => {
    console.error(err);
    process.exit(1);
  }
);
