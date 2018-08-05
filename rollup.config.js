import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import pkg from './package.json';

export default [
  // browser-friendly UMD build
  {
    input: 'src/rx-render.js',
    external: ['react', 'rxjs'],
    output: {
      globals: { react: 'React', rxjs: 'rxjs' },
      file: pkg.browser,
      name: 'rxReactRender',
      format: 'umd'
    },
    plugins: [
      resolve(), // so Rollup can find modules
      babel({
        exclude: ['node_modules/**'],
        plugins: ['external-helpers']
      }),
      commonjs() // so Rollup can convert modules to an ES module
    ]
  },

  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // the `targets` option which can specify `dest` and `format`)
  {
    input: 'src/rx-render.js',
    external: ['react', 'rxjs', 'prop-types'],
    output: [{ file: pkg.main, format: 'cjs' }, { file: pkg.module, format: 'es' }],
    plugins: [
      babel({
        exclude: ['node_modules/**'],
        plugins: ['external-helpers']
      })
    ]
  }
];
