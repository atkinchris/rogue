/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const merge = require('webpack-merge')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const paths = {
  SRC: path.resolve(__dirname, 'src'),
  DEST: path.resolve(__dirname, 'dist'),
  RESOURCES: path.resolve(__dirname, 'resources'),
}

const common = {
  entry: {
    main: ['@babel/polyfill', paths.SRC],
  },
  output: {
    path: paths.DEST,
    publicPath: '',
    filename: '[name].[hash:8].js',
    chunkFilename: '[name].[chunkhash:8].js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['babel-loader', 'ts-loader'],
      },
      {
        test: /\.js$/,
        use: ['source-map-loader'],
        exclude: [/node_modules/],
        enforce: 'pre',
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  plugins: [
    new MiniCssExtractPlugin({ fileName: '[name].[contenthash:8].css' }),
    new HtmlWebpackPlugin({ template: path.join(paths.SRC, 'index.html') }),
    new CopyWebpackPlugin([{ from: paths.RESOURCES, ignore: ['*.psd'] }]),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
}

const development = {
  mode: 'development',
  devServer: {
    historyApiFallback: true,
    inline: true,
    stats: 'errors-only',
  },
  plugins: [new webpack.LoaderOptionsPlugin({ debug: true }), new webpack.NamedModulesPlugin()],
  devtool: 'cheap-module-source-map',
}

const production = {
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
      }),
    ],
  },
  devtool: 'source-map',
}

function config(environment) {
  switch (environment) {
    case 'production':
      return merge(common, production)
    default:
      return merge(common, development)
  }
}

module.exports = config(process.env.NODE_ENV)
