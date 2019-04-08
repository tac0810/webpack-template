const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const CONFIG = require('./config');

module.exports = {
	context: CONFIG.SRC,
	entry: [CONFIG.SRC + '/sass/entry.sass'],
	resolve: {
		alias: {
			'img': path.resolve(CONFIG.DIST + '/img')
		},
	},
	output: {
		path: CONFIG.DIST + '/css',
		filename: 'bundle.css'
	},
	module: {
		rules: [
			{
				test: /\.sass$/,
				use: ExtractTextPlugin.extract(
					{
						fallback: "style-loader",
						use: [
							{
								loader: "css-loader",
								options: {
									url: true,
								}
							},
							{
								loader: 'postcss-loader',
								options: {
									config: {
										path: CONFIG.PROJECT + '/_config/postcss.config.js'
									}
								}
							},
							{
								loader: "sass-loader",
								options: {
									outputStyle: 'compressed',
									sourceMap: true,
									sourceMapContents: false
								}
							},
						],
					}
				)
			},
			{
				test: /\.(jpg|jpeg|png|svg)$/,
				use: [{
					loader: 'file-loader',
					options: {
						name(file) {
							return file.replace(CONFIG.PROJECT, '').replace('/public/assets', '..');
						},
						emitFile: false
					}
				}]
			},
			{
				test: /\.(woff|woff2)$/,
				use: [{
					loader: 'url-loader',
				}]
			}
		]
	},
	plugins: [
		new ExtractTextPlugin({
			filename: "bundle.css",
			disable: false,
			allChunks: true,
			publicPath: './public/',
		}),
		new BrowserSyncPlugin({
			proxy: CONFIG.BrowserSync.proxy,
			port: CONFIG.BrowserSync.port,
			notify: CONFIG.BrowserSync.notify,
			open: CONFIG.BrowserSync.open,
			files: [
				CONFIG.DIST + '/css/*.css',
				CONFIG.DIST + '/js/*.js',
				CONFIG.PROJECT + '/**/*.html',
				CONFIG.PROJECT + '/**/*.php',
			]
		})
	]
}
