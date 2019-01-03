import { createFilter } from 'rollup-pluginutils';
import stylelint from 'stylelint';

const options = {
  formatter: 'string',
};

export default () => {
  const filter = createFilter('**/*.{html,css}', '');

  return {
    name: 'stylelint',

    transform(code, id) {
      if (!filter(id)) return;

      return stylelint
        .lint({ code, ...options })
        .then(({ errored, output }) => {
          if (errored) throw Error(output);
        });
    },
  };
};
