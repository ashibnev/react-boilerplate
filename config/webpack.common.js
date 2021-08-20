const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSVGPlugin = require('html-webpack-inline-svg-plugin');

module.exports = {
  entry: path.resolve(__dirname, '../src/index.js'),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src/'),
      '@components': path.resolve(__dirname, '../src/components'),
      '@pages': path.resolve(__dirname, '../src/pages'),
      '@style': path.resolve(__dirname, '../src/style'),
    },
  },
  module: {
    rules: [
      {
        test: /\.svg/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/static/[name].[hash][ext]',
        },
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/,
        type: 'asset/inline',
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, '../src/index.html'),
    }),
    new HtmlWebpackInlineSVGPlugin({
      runPreEmit: true,
      inlineAll: true,
      svgoConfig: [
        {
          removeDimensions: true,
        },
      ],
    }),
  ],
};
