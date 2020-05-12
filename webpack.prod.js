const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',

  devtool: 'source-map',

  externals: {
    Config: JSON.stringify({
      arkipelEndpoint: 'https://api.arkipel.io/query',
    }),
  },
});
