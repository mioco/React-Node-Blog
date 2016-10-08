module.exports = {
  entry: './index.js',

  output: {
    filename: 'main.js',
    path: '../server/public/access',
    publicPath: '/access/'
  },
  watch:true,
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader?presets[]=es2015&presets[]=react' },
      { test: /\.css$/, loader: "style!css" },
      { test: /\.sass$/, loader: "style!css!sass" },
      { test: /\.(jpg|png|otf)$/, loader: "url?limit=100000" }
    ]
  }
}
