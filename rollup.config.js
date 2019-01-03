import resolve from 'rollup-plugin-node-resolve';

import stylelint from './plugins/stylelint';
import postcss from './plugins/postcss-inline';

export default {
  input: 'input/index.js',

  output: {
    format: 'esm',
    dir: 'output',
  },

  plugins: [
    resolve({
      jsnext: true,
      browser: true,
      modulesOnly: true,
    }),

    stylelint(),

    postcss(),
  ],
};
