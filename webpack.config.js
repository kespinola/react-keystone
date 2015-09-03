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
				test: /\.js$|\.jsx$/,
				loaders: ['babel-loader']
			},
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.gif$/, loader: "url-loader?mimetype=image/png" },
      { test: /\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/, loader: "url-loader?mimetype=application/font-woff" },
      { test: /\.(ttf|eot|svg)(\?v=[0-9].[0-9].[0-9])?$/, loader: "file-loader?name=[name].[ext]" },
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json', '.css']
  },
  plugins: [
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3030,
      proxy:"http://localhost:3000/",
      browser: "google chrome",
      files:["public/build/*"],
    })
  ],
};
