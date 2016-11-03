let Path = require('path'),
  webpack = require('webpack'),
  HtmlWebpackPlugin = require('html-webpack-plugin')

const config = {
  entry: {
    app: ['babel-polyfill', Path.resolve(process.cwd(),'src/components/app')]
  },
  output: {
    path: Path.join(__dirname, 'build') ,
    filename: '[name]-bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js$/, loader: 'babel', include: Path.resolve(process.cwd(), './src'),
        query: {
          presets: ['es2015', 'react'],
          plugins: [
            ["transform-object-rest-spread", { "useBuiltIns": true }],
            ['transform-es2015-modules-commonjs']
          ]
        }
    }]
  },
  resolve: {
    extension: ['', '.js'],
    modulesDirectories: ['node_modules']
  },
  plugins: [
    // new HtmlWebpackPlugin({ template: Path.resolve(__dirname, 'index.html')})
  ],
  devServer: {
    contentBase: process.cwd(),
    port: 3000,
    hot: true, 
    inline: true,
    publicPath: Path.resolve(process.cwd(), '/build/'),
    stats: { colors: true }
  }
}

module.exports = config
