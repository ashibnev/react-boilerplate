const { resolve } = require('path');
const globImporter = require('node-sass-glob-importer');

const geAdditionalData = () => {
  const arr = [
      `@use 'sass:math'`,
      `@import 'src/styles/utils/inline-sass/_index.sass'`,
      `@import 'src/styles/mixins/_index.sass'`,
      `@import 'src/styles/config/_index.sass'`,
      `@import 'src/styles/placeholders/_index.sass'`,
  ];

  return arr.join('\n');
};

module.exports.cssLoaders = [
  {
    loader: 'css-loader',
    options: {
      importLoaders: 2,
    },
  },
  {
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        config: resolve(__dirname, 'postcss.config.js'),
      },
    },
  },
  'resolve-url-loader',
  {
    loader: 'sass-loader',
    options: {
      sourceMap: true,
      webpackImporter: false,
      sassOptions: {
        importer: globImporter(),
      },
      additionalData: geAdditionalData(),
    },
  },
];
