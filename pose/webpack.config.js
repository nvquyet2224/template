const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");



const devMode = false;
const configProduction = {
    collapseWhitespace: true, 
    removeComments: true, 
    removeRedundantAttributes: false, // default = true ==> remove attr type of input
    removeScriptTypeAttributes: true, 
    removeStyleLinkTypeAttributes: true, 
    useShortDoctype: true 
}

module.exports = {
  mode: devMode ? 'development' : 'production',
  watch: true,
  entry: {
    'index': ['./index.js']
  },
  output: {
    publicPath: './',
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name]_bundle.js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }, {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: "css-loader",
          },
          {
            loader: "sass-loader",
            options: {
              implementation: require("sass")
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: 'images/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|ttf|otf|eot)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: 'fonts/[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    }),
    new UglifyJsPlugin({
      uglifyOptions: {
        comments: false,
        compress: {
          drop_console: true
        }
      },
    }),
    new HtmlWebpackPlugin({
      inject: false,
      minify: devMode ? false : configProduction,
      filename: 'index.html',
      template: 'index.html'
    })
  ],
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  watchOptions: {
    ignored: '**/node_modules',
    aggregateTimeout: 100,
  }
};
