const webpack                   = require('webpack');
const path                      = require('path');
const ExtractTextWebpackPlugin  = require('extract-text-webpack-plugin');
const UglifyJsPlugin            = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssets         = require('optimize-css-assets-webpack-plugin');
const $                         = require('jquery');



let config = {
	entry: './src/index.js',
	output: {
    path: path.resolve(__dirname, './public'),
		filename: 'bundle.js'
	},
	module: {
   	rules: [
    	{
      	test: /\.js$/, // files ending with .js
      	exclude: /node_modules/, // exclude the node_modules directory
      	loader: "babel-loader" // use this (babel-core) loader
    	},
    	{
    		test: /\.scss$/, //All files ending with .scss
        use: ExtractTextWebpackPlugin.extract({
            use: ['css-loader', 'sass-loader'],
            fallback: 'style-loader'
        })
    	},
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: ['file-loader?context=src/assets/images/&name=images/[path][name].[ext]', {  // images loader
          loader: 'image-webpack-loader',
          query: {
            mozjpeg: {
              progressive: true,
            },
            gifsicle: {
              interlaced: false,
            },
            optipng: {
              optimizationLevel: 4,
            },
            pngquant: {
              quality: '75-90',
              speed: 3,
            },
          },
        }],
        exclude: /node_modules/,
        include: __dirname,
      },
    ] //end rules
  },
  plugins: [
    new ExtractTextWebpackPlugin('styles.css'),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ],
  devServer: {
    contentBase: path.resolve(__dirname, './public'),
    historyApiFallback: true,
    inline: true,
    open: true
  },
  devtool: 'eval-source-map'
}


module.exports = config;

if (process.env.NODE_ENV === 'production') {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin(), // call the uglify plugin
    new OptimizeCSSAssets()
  );
}