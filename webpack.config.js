const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const WebpackPWAManifest = require('webpack-pwa-manifest');

module.exports = {
  entry: './src/index',

  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },

  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(gif|jpg|png|svg)$/,
        use: ['file-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader'],
      },
    ],
  },

  plugins: [
    new HTMLWebpackPlugin({
      favicon: './src/assets/favicon.ico',
      template: './src/index.html',
    }),
    new WebpackPWAManifest({
      name: 'Arkipel',
      short_name: 'Arkipel',
      description: 'Client for Arkipel.',
      background_color: '#ffffff',
      start_url: '/',
      display: 'standalone',
      scope: '/',
      theme_color: '#ddd',
      icons: [
        {
          src: './src/assets/logo/arkipel_192.png',
          sizes: '192x192',
        },
        {
          src: './src/assets/logo/arkipel_512.png',
          size: '512x512',
        },
      ],
    }),
  ],

  devServer: {
    historyApiFallback: true,
  },
};
