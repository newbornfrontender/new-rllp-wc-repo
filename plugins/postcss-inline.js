import { createFilter } from 'rollup-pluginutils';
import postcssrc from 'postcss-load-config';
import postcss from 'postcss';
import syntax from 'postcss-syntax';

export default () => {
  const filter = createFilter('**/*.{html,css}', '');

  return {
    name: 'postcss',

    transform(code, id) {
      if (!filter(id)) return;

      return postcssrc().then(({ plugins, options }) =>
        postcss(plugins)
          .process(code, { from: id, syntax, ...options })
          .then(({ css }) => ({
            code: `export default ${JSON.stringify(css)};`,
            map: { mappings: '' },
          })),
      );
    },
  };
};
