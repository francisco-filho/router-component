let Path = require('path'),
  webpack = require('webpack')

const config = {
  entry: {
    app: ['babel-polyfill', Path.resolve(process.cwd(),'src/components/app')]
  },
  output: {
    path: Path.join(__dirname, './build') ,
    filename: '[name]-bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js$/, loader: 'babel', include: Path.resolve(process.cwd(), './src'),
        query: {
          presets: ['es2015', 'react'],
          plugins: ['transform-es2015-modules-commonjs']
        }
    }]
  },
  resolve: {
    extension: ['', '.js'],
    modulesDirectories: ['node_modules']
  },
  devServer: {
    contentBase: process.cwd(),
    port: 3000,
    hot: true, 
    inline: true,
    publicPath: Path.resolve(process.cwd(), '/public/'),
    stats: { colors: true }
  }
}

module.exports = config
