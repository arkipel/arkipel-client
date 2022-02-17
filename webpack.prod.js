const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const WorkboxPlugin = require('workbox-webpack-plugin');

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

  plugins: [
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
      maximumFileSizeToCacheInBytes: 20000000,
    }),
  ],
});
