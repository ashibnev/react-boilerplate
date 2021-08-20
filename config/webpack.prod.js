const baseConfig = require('./webpack.common.js');

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// common part for production and dev
const { cssLoaders } = require('./util');

module.exports = merge(baseConfig, {
  mode: 'production',
  target: 'browserslist',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'vendor/js/[name].[fullhash].js',
    publicPath: './',
  },
  module: {
    rules: [
      {
        test: /\.(css|sass|scss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // set path for images
              // this setting is compatible with windows
              // changes the path to the file, in our case svg
              publicPath: '../../',
            },
          },
          ...cssLoaders,
        ],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  plugins: [
    // when we run the production build then
    // the docs folder is cleared
    new CleanWebpackPlugin({
      dry: false,
      verbose: true,
    }),

    // we extract scss files from js and create
    // separate files for individual pages
    new MiniCssExtractPlugin({
      filename: 'vendor/css/[name].[fullhash].css',
      chunkFilename: 'vendor/css/[name].[fullhash].css',
    }),

    // we create a service-worker for our data
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
      directoryIndex: 'index.html',
      offlineGoogleAnalytics: true,
    }),

    // we copy all necessary graphic files
    // and assets to build folder
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'assets/',
          to: 'assets/',
        },
        {
          from: 'assets/images/',
          to: 'images/',
          // blocking file copying by plugin webpack will
          // do it for you and rename it with a hash
          globOptions: {
            ignore: ['**.svg'],
          },
        },
      ],
    }),
  ],
});
