const HtmlWebPackPlugin = require("html-webpack-plugin");
const WebapckManifestPlugin = require("webpack-manifest-plugin");
const CopyPlugin = require('copy-webpack-plugin');
var webpack = require('webpack');
var path = require('path');
require('dotenv').config();
var nodeExternals = require('webpack-node-externals')


module.exports = {
  
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
                options: {
                    presets: [
                        "@babel/preset-env",
                        "@babel/preset-react"
                    ],
                    plugins: [
                        "@babel/plugin-syntax-dynamic-import",
                        "@babel/plugin-proposal-class-properties"
                    ]
                }
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          'isomorphic-style-loader',
          'style-loader',
          'css-loader'
        ]
        
      },
      
      
    {
        test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
        loader: "url-loader?limit=100000" }
    ]
  },
  node: {
    fs: 'empty'
  },
  plugins: [
    new CopyPlugin([
      { from: 'assets', to: 'assets' }
    ]),
    new HtmlWebPackPlugin({
      template: "./public/index.html",
      filename: "./index.html"
    }),
    new WebapckManifestPlugin({
      template: "./public/manifest.json"
    }),
    new webpack.DefinePlugin({
      "process.env.BROWSER": JSON.stringify(true)
      
  })
  ],
  
  resolve: {
    extensions: ["*",".js",".jsx"]
  },
  devServer: {
    historyApiFallback: true,
    // contentBase: './'
    hot: true
  },
}