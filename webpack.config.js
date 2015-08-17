'use strict';
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {

  entry: './public/index.js',
  output: {
    path:'./public/build',
    filename: 'bundle.js',
  },
  debug:true,
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
  },
  plugins: [
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3030,
      proxy:"http://localhost:3000/",
      browser: "google chrome",
      files:["public/build/!*"],
    })
  ],
};
