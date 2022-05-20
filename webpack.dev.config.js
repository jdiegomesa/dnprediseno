const path = require('path');
const webpack = require("webpack");

module.exports={
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/app.js'
  },
  devServer: {
    port: 9000
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
         test: /\.css$/,
         exclude: /(node_modules|bower_components)/,
         use: [
           {
             loader: 'style-loader'
           },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
              }
            },
            {
              loader: 'postcss-loader'
            }
          ]
       },
       {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react'
              ],
              plugins: [
                ["@babel/plugin-proposal-class-properties", { "loose": true }]
              ]
            }
          }
        },
        {
        	test: /\.(jpg|png|gif|svg)$/,
        	use:{
          	loader: 'url-loader',
          	options: {
            		limit: 100000,
                name: 'assets/[name].[ext]'
          	}
        	}
    	  }
     ]
  },
  plugins: [
    new webpack.DllReferencePlugin({
      manifest: require('./modules-manifest.json')
    })
  ],
  watchOptions: {
    poll: true
  }
}
