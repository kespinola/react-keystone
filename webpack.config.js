'use strict';
module.exports = {

  entry: './public/index.js',
  output: {
    path:'public/build',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
			{
				//tell webpack to use jsx-loader for all *.jsx files
				test: /\.js$/,
				loader: 'jsx-loader?harmony'
			},
      {
        //tell webpack to use jsx-loader for all *.jsx files
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
