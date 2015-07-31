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
				loader: 'jsx-loader?harmony'
			},
      {
        test: /\.jsx$/,
        loader: 'jsx-loader?harmony'
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
