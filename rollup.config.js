// Rollup plugins
// import babel from 'rollup-plugin-babel';
// import eslint from 'rollup-plugin-eslint';
// import resolve from 'rollup-plugin-node-resolve';


import commonjs from 'rollup-plugin-commonjs';
// import replace from 'rollup-plugin-replace';
import { uglify } from "rollup-plugin-uglify";
import ignore from "rollup-plugin-ignore"



export default {
  input: "lib/main.js",
  output: {
    file: "dist/bundle.min.js",
    format: "cjs",
    exports: "auto"
  },
  // dest: "dist/autopilot.min.js",
  // format: "iife",
  // sourceMap: "inline",
  plugins: [
    // resolve({
    //   jsnext: true,
    //   main: true,
    //   browser: true,
    // }),
    commonjs(),
    ignore(['./patchedMath']),

    // eslint({
    //   exclude: ['src/styles/**'],
    // }),
    // babel({
    //   exclude: 'node_modules/**',
    // }),
    // replace({
    //   ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
    // }),
    uglify(),
  ],
};
