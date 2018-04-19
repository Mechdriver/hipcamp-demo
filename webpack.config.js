var webpack = require('webpack');
var path = require('path');

var APP_DIR = path.resolve(__dirname, 'app/src/react');

var config = {
  entry: APP_DIR + '/CampFeatures.jsx',
  output: {
    path: path.resolve(__dirname, 'app/static/lib/'),
    filename: 'bundle.js'
  },
  module: {
    rules : [
      {
        test: /\.jsx?/,
        include: APP_DIR,
        loader: 'babel-loader'
      },
      {
        test: /\.jpe?g$/,
        loader: "file-loader"
      },
      {
        test: /\.(s*)css$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  }
};

module.exports = config;
