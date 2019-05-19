const webpack = require('webpack')
const fs = require('fs')

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [new webpack.IgnorePlugin(/\.\/native/, /\/pg\//)],
  target: 'node',
  externals: (() => {
    const nodeModules = {}
    fs.readdirSync('node_modules')
      .filter(function(x) {
        return ['.bin'].indexOf(x) === -1
      })
      .forEach(function(mod) {
        nodeModules[mod] = 'commonjs ' + mod
      })
    return nodeModules
  })(),
}
