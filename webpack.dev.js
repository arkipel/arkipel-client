const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',

  devtool: 'inline-source-map',

  devServer: {
    historyApiFallback: true,
    hot: true,
  },

  externals: {
    Config: JSON.stringify({
      domain: 'arkipel.local',
      arkipelEndpoint: 'http://arkipel.local:9192/query',
      mapsEndpoint: 'http://arkipel.local:9192/artifacts/maps/',
    }),
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: {
              plugins: [require.resolve('react-refresh/babel')].filter(Boolean),
            },
          },
        ],
      },
    ],
  },

  plugins: [new ReactRefreshWebpackPlugin()].filter(Boolean),
});
