const path = require('path');
const webpack = require("webpack");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CONFIG = require('./config');
const PRODUCTION = JSON.stringify(process.env.NODE_ENV === "production");

module.exports = {
	context: CONFIG.SRC,
	entry: {
		main: './js/index.js'
	},
	output: {
		path: CONFIG.DIST + '/js',
		filename: '[name].bundle.js'
	},
	resolve: {
		alias: {
			'js': path.join(CONFIG.SRC, '/js'),
			'TweenLite': 'gsap/src/uncompressed/TweenLite',
		}
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				include: CONFIG.SRC + '/js',
				use: [{
					loader: 'babel-loader',
					options: {
						presets: [
							['es2015', { modules: false }]
						]
					}
				}]
			}, {
				test: /\.(png|jpg|gif)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							// limit: 8192
						}
					}
				]
			}
		]
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				vendor: {
					test: /node_modules/,
					name: 'vendor',
					chunks: 'initial',
					enforce: true
				}
			}
		}
	},
	plugins: [
		new webpack.ProvidePlugin({
			'$': 'jquery',
			'jquery': 'jquery',
			'window.jQuery': 'jquery',
			'jQuery': 'jquery',
			'TweenLite': 'gsap/src/uncompressed/TweenLite',
			'Promise': 'es6-promise',
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
			'process.env.TIME_STAMP': JSON.stringify(Date.now()),
			'PRODUCTION': PRODUCTION,
		}),
		new UglifyJsPlugin({
			sourceMap: !PRODUCTION,
			uglifyOptions: {
				warnings: false
			}
		}),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.optimize.AggressiveMergingPlugin()
	],
	devtool: PRODUCTION ? '' : 'source-map'
}
