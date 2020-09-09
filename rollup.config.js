import pkg from "./package.json";
import cleanup from "rollup-plugin-cleanup";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import json from "@rollup/plugin-json";

export default {
  input: "src/main.js",
  plugins: [cleanup(), nodeResolve(), json()],
  output: [
    { format: "es", file: pkg.module },
    { format: "cjs", file: pkg.main },
    { format: "umd", file: pkg.browser, name: pkg.name },
  ],
};
