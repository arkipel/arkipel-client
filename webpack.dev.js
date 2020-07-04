const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',

  devtool: 'inline-source-map',

  devServer: {
    historyApiFallback: true,
    hot: true,
  },

  externals: {
    Config: JSON.stringify({
      domain: 'local.arkipel.io',
      arkipelEndpoint: 'http://local.arkipel.io:9192/query',
    }),
  },
});
