// Rollup plugins
// import babel from 'rollup-plugin-babel';
// import eslint from 'rollup-plugin-eslint';
// import resolve from 'rollup-plugin-node-resolve';
// import commonjs from 'rollup-plugin-commonjs';
// import replace from 'rollup-plugin-replace';
import { uglify } from "rollup-plugin-uglify";

export default {
  input: "lib/Autopilot.js",
  output: {
    file: "dist/autopilot.min.js",
    format: "cjs",
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
    // commonjs(),
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
