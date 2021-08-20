const packageJSON = require('../package.json');

const overrideBrowserslist = packageJSON.browserslist.production;

// console.log(overrideBrowserslist);

module.exports = {
  plugins: {
    autoprefixer: {
      overrideBrowserslist,
    },
    cssnano: {
      safe: true,
      normalizeUrl: false,
    },
  },
};
