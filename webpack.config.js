/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const merge = require('webpack-merge')

const paths = {
  SRC: path.resolve(__dirname, 'src'),
  DEST: path.resolve(__dirname, 'dist'),
}

const common = {
  entry: {
    main: paths.SRC,
  },
  output: {
    path: paths.DEST,
    publicPath: '',
    filename: '[name].[hash:8].js',
    chunkFilename: '[name].[chunkhash:8].js',
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: 'babel-loader',
    }, {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader'],
      }),
    }],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new ExtractTextPlugin('[name].[contenthash:8].css'),
    new HtmlWebpackPlugin({ template: path.join(paths.SRC, 'index.html') }),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
}

const development = {
  devServer: {
    historyApiFallback: true,
    inline: true,
    stats: 'errors-only',
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({ debug: true }),
    new webpack.NamedModulesPlugin(),
  ],
  devtool: 'cheap-module-source-map',
}

const production = {
  plugins: [
    new CleanWebpackPlugin([paths.DEST]),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
      },
      sourceMap: true,
    }),
  ],
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
