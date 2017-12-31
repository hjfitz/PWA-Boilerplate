const Notifier = require("webpack-build-notifier");

const ping = new Notifier({ title: `${process.env.SITE_NAME || "Built"}` });

const path = require('path');
const output = path.join(__dirname, 'public');


module.exports = {
  entry: { bundle: ['./src/client/router.jsx']  },
  output: { 
    filename: '[name].js',
    path:  output
  },
  devtool: 'source-map',
  resolve: {
    extensions: [".js", ".jsx", ".json", ".css"]
  },
  module: { 
    loaders: [ 
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: [
            ['env', { 
              targets: { 
                browsers: [
                  'last 2 versions',
                  'ie >= 11'
                ] 
              },
              debug: true,
            }],
            'react',
          ]
        }
      } 
    ] 
  },
  plugins: [ping]
};
