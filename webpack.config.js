const Notifier = require("webpack-build-notifier");

module.exports = {
  entry: ["babel-polyfill", "./src/react-components/router.jsx"],
  output: {
    path: `${__dirname}/public/javascripts`,
    filename: "bundle.js"
  },
  devtool: "source-map",
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ["es2015", "react"]
        }
      }
    ]
  },
  plugins: [new Notifier({ title: `${process.env.SITE_NAME || "Built"}` })]
};
