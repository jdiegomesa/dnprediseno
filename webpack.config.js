const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const webpack = require("webpack");

module.exports={
  mode: 'production',
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/app.[hash].js',
  },
  module: {
    rules: [
      {
         test: /\.css$/,
         exclude: /(node_modules|bower_components)/,
         use: ExtractTextPlugin.extract({
           use:[
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
        })
       },
       {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
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
                name: 'assets/[name].[hash].[ext]'
          	}
        	}
    	  }
     ]
  },
  plugins: [
    new ExtractTextPlugin("css/dnp_styles.[hash].css"),
    new webpack.DllReferencePlugin({
      manifest: require('./modules-manifest.json')
    })
  ],
  optimization: {
		minimizer: [
			new UglifyJsPlugin()
    ]
  }
}
