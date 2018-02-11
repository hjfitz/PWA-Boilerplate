const Notifier = require("webpack-build-notifier");
const path = require('path');

const ping = new Notifier({ title: `${process.env.SITE_NAME || "Webpack"}` });
const output = path.join(__dirname, 'public', 'javascripts');

const babelConfig = {
  presets: [
    ['@babel/preset-env', {
      useBuiltIns: 'usage',
      targets: {
        browsers: [
          'last 2 versions',
          'ie >= 11',
        ],
      },
    }],
    '@babel/react',
  ],
};

const cssConfig = 
  [
    { loader: 'style-loader' },
    {
        loader: 'css-loader',
        options: {
            importLoaders: 1,
        }
    },
    { loader: 'postcss-loader' }

];


module.exports = {
  entry: { bundle: ['./src/client/router.jsx']  },
  output: { filename: '[name].js', path: output },
  devtool: 'source-map',
  resolve: { extensions: [".js", ".jsx", ".json", ".css"] },
  module: { 
    loaders: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: cssConfig,
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: babelConfig,
      } 
    ] 
  },
  plugins: [ping]
};
