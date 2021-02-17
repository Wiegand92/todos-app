const path = require('path')

module.exports = {
  entry:'./src/todos_app.js',
  output: {
    path: path.resolve(__dirname, 'public/scripts'),
    filename: 'todos_app.js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader:'babel-loader',
        options: {
          presets: ['@babel/env']
        }
      }
    }]
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    publicPath: '/scripts/'
  }
}