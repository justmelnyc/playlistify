module.exports = [{
  test: /\.tsx?$/,
  exclude: /(node_modules|bower_components|.d.ts|typings|public\/)/,
  loader: "awesome-typescript-loader",
}, {
  test: /\.ts?$/,
  exclude: /(node_modules|bower_components|.d.ts|typings|public\/)/,
  loader: "awesome-typescript-loader",
}, {
  test: /\.jsx?$/,
  exclude: /(node_modules|bower_components|typings|.d.ts|public\/)/,
  loader: "babel",
  query: {
    presets: ['react']
  }
}, {
  test: /\.js?$/,
  exclude: /(node_modules|bower_components|typings|.d.ts|public\/)/,
  loader: "babel",
  query: {
    presets: ['react']
  }
}, {
  test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
  exclude: /(node_modules|bower_components|typings)/,
  loader: "file"
}, {
  test: /\.(woff|woff2)$/,
  exclude: /(node_modules|bower_components|typings)/,
  loader: "url?prefix=font/&limit=5000"
}, {
  test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
  exclude: /(node_modules|bower_components|typings)/,
  loader: "url?limit=10000&mimetype=application/octet-stream"
}, {
  test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
  exclude: /(node_modules|bower_components|typings)/,
  loader: "url?limit=10000&mimetype=image/svg+xml"
}, {
  test: /\.gif/,
  exclude: /(node_modules|bower_components|typings)/,
  loader: "url-loader?limit=10000&mimetype=image/gif"
}, {
  test: /\.jpg/,
  exclude: /(node_modules|bower_components|typings)/,
  loader: "url-loader?limit=10000&mimetype=image/jpg"
}, {
  test: /\.png/,
  exclude: /(node_modules|bower_components|typings)/,
  loader: "url-loader?limit=10000&mimetype=image/png"
}, {
  test: /\.scss$/,
  loaders: ['style', 'css', 'sass']
}];