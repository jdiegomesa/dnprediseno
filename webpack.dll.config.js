const path = require('path');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const webpack = require("webpack");

module.exports={
  mode: 'production',
  entry: {
    modules: [
      'react',
      'react-dom'
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: '[name]'
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]',
      path: path.join(__dirname, '[name]-manifest.json')
    })
  ],
  optimization: {
		minimizer: [
			new UglifyJsPlugin()
    ]
  }
}
