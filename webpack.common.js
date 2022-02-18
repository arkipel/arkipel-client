const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

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
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(css)$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(gif|jpg|png|svg)$/,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: 'asset/resource',
      },
    ],
  },

  plugins: [
    new HTMLWebpackPlugin({
      template: './src/index.html',
    }),
    new FaviconsWebpackPlugin({
      mode: 'webapp',
      devMode: 'webapp',
      logo: './src/assets/logo/arkipel_512.png',
      inject: true,
      outputPath: 'pwa',
      publicPath: 'pwa',
      prefix: '',
      favicons: {
        appName: 'Arkipel',
        appShortName: 'Arkipel',
        appDescription: 'Client for Arkipel.',
        start_url: '/',
        score: '/',
        display: 'standalone',
        background: '#ede7d4',
        theme_color: '#ede7d4',
        developerName: 'Marc-François Cochaux-Laberge',
        developerURL: 'https://mfcl.io',
        icons: {
          android: { background: '#ede7d4' },
          appleIcon: { background: '#ede7d4' },
          appleStartup: { background: '#ede7d4', offset: 12 },
          windows: { background: '#ede7d4' },
        },
      },
    }),
  ],
};
