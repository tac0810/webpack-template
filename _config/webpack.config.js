const path = require( 'path' );
const webpack = require( "webpack" );
const ExtractTextPlugin = require( "extract-text-webpack-plugin" );
const BrowserSyncPlugin = require( 'browser-sync-webpack-plugin' );
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const CONFIG = {
    PROJECT: path.resolve( __dirname, '../' ),
    PUBLIC: path.resolve( __dirname, '../public' ),
    DIST: path.resolve( __dirname, '../public/assets' ),
    SRC: path.resolve( __dirname, '../src' ),
    BrowserSync: {
        proxy: 'localhost',
        port: 3000,
        notify: false,
        open: false
    }
};

module.exports = env => {
    const PRODUCTION = JSON.stringify( process.env.NODE_ENV === "production" );

    // sass
    // --------------------------------------------------
    const sassBuildConfig = {
        context: CONFIG.SRC,
        entry: [ CONFIG.SRC + '/sass/index.sass' ],
        output: {
            path: CONFIG.DIST + '/css',
            filename: 'bundle.css'
        },
        module: {
            rules: [ {
                test: /\.sass$/,
                use: ExtractTextPlugin.extract( {
                    fallback: "style-loader",
                    use: [ {
                        loader: "css-loader",
                        options: {
                            root: CONFIG.PROJECT,
                        }
                    }, {
                        loader: 'postcss-loader',
                        options: {
                            config: {
                                path: CONFIG.PROJECT + '/_config/postcss.config.js'
                            }
                        }
                    }, {
                        loader: "sass-loader",
                        options: {
                            outputStyle: 'compressed',
                        }
                    }, ],
                } )
            }, {
                test: /\.(jpg|jpeg|png|svg)$/,
                use: [ {
                    loader: 'file-loader',
                    options: {
                        name( file ) {
                            return file.replace( CONFIG.PROJECT, '' ).replace( '/public/assets', '..' );
                        },
                        emitFile: false
                    }
                } ]
            }, {
                test: /\.(woff|woff2)$/,
                use: [ {
                    loader: 'url-loader',
                } ]
            } ]
        },
        plugins: [
            new ExtractTextPlugin( {
                filename: "bundle.css",
                disable: false,
                allChunks: true
            } ),
            new BrowserSyncPlugin( {
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
            } )
        ]
    };
    // js
    // --------------------------------------------------
    const jsBuildConfig = {
        context: CONFIG.SRC,
        entry: [ './js/index.js' ],
        output: {
            path: CONFIG.DIST + '/js',
            filename: 'bundle.js'
        },
        resolve: {
            alias: {
                '@': path.join( __dirname, '../src/js/vue/views' ),
                'js': path.join( __dirname, '../src/js/' ),
                'sass': path.join( __dirname, '../src/sass/' ),
                'TweenLite': 'gsap/src/uncompressed/TweenLite',
            }
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    include: CONFIG.SRC + '/js',
                    use: [ {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                [ 'es2015', { modules: false } ]
                            ]
                        }
                    } ]
                }, {
                    test: /\.(glsl|vs|fs)$/,
                    include: CONFIG.SRC + '/js',
                    use: [ {
                        loader: 'shader-loader'
                    } ]
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
        externals: {
            'THREE': 'three',
        },
        plugins: [
            new webpack.ProvidePlugin( {
                '$': 'jquery',
                'jquery': 'jquery',
                'window.jQuery': 'jquery',
                'jQuery': 'jquery',
                'TweenLite': 'gsap/src/uncompressed/TweenLite',
                'Promise': 'es6-promise',
            } ),
            new webpack.DefinePlugin( {
                'process.env.NODE_ENV': JSON.stringify( process.env.NODE_ENV ),
                'process.env.TIME_STAMP': JSON.stringify( Date.now() ),
                'PRODUCTION': PRODUCTION,
            } ),
            new UglifyJsPlugin( {
                sourceMap: !PRODUCTION,
                uglifyOptions: {
                    warnings: false
                }
            } ),
            new webpack.optimize.OccurrenceOrderPlugin(),
            new webpack.optimize.AggressiveMergingPlugin()
        ],
        devtool: PRODUCTION ? '' : 'source-map'
    };

    const tasks = [ sassBuildConfig, jsBuildConfig ];

    return 'all' !== env ? tasks[ Number( env ) ] : tasks;
};