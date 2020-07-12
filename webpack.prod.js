const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',

  devtool: 'source-map',

  externals: {
    Config: JSON.stringify({
      domain: 'arkipel.io',
      arkipelEndpoint: 'https://api.arkipel.io/query',
      mapsEndpoint: 'https://api.arkipel.io/artifacts/maps/',
    }),
  },
});
