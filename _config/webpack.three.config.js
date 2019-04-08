const path = require('path');
const webpack = require("webpack");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CONFIG = require('./config');
const PRODUCTION = JSON.stringify(process.env.NODE_ENV === "production");

module.exports = {
	context: CONFIG.SRC,
	entry: {
		stage: './js/three/Stage.js'
	},
	output: {
		path: CONFIG.DIST + '/js/',
		filename: 'stage.js'
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
				test: /\.(glsl|vs|fs)$/,
				include: CONFIG.SRC + '/js',
				use: [{
					loader: 'shader-loader'
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
	plugins: [
		new webpack.ProvidePlugin({
			'TweenLite': 'gsap/src/uncompressed/TweenLite',
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
};
