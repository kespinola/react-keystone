'use strict';
module.exports = {

  entry: './public/index.js',
  output: {
    path:'public/build',
    filename: 'bundle.js',
  },
  module: {
    loaders: [
			{
				test: /\.js$/,
				loader: 'babel-loader'
			},
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.json']
  }
};
