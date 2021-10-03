// Rollup plugins
import commonjs from 'rollup-plugin-commonjs';
import { uglify } from "rollup-plugin-uglify";
import ignore from "rollup-plugin-ignore"

export default [
  {
    input: "lib/main.js",
    output: {
      file: "bundle/bundle.min.js",
      format: "cjs",
      exports: "auto"
    },
    plugins: [
      commonjs(),
      ignore(['./patchedMath']),
      uglify(),
    ],
  },
  {
    input: "lib/main.js",
    output: {
      file: "bundle/bundle.js",
      format: "cjs",
      exports: "auto"
    },
    plugins: [
      commonjs(),
      ignore(['./patchedMath']),
    ],
  }
]
