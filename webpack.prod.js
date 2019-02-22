const path = require('path');
const webpack = require('webpack');

const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin'); //installed via npm
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInjector = require('html-webpack-injector');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const buildPath = path.resolve(__dirname, 'dist');
const utils = require('./sources/pages');
const pkg = require('./package.json');

module.exports = env => {
    return {
        devtool: 'source-map',
        entry: {
            turbolink_head: 'turbolinks',
            polyfill: '@babel/polyfill',
            app: './sources/index.js'
        },
        output: {
            filename: 'static/scripts/[name].[hash:8].js',
            path: buildPath,
        },
        node: {
            fs: 'empty'
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                },
                {
                    test: /\.(scss|css|sass)$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: false
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: false
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                outputStyle: 'compressed',
                                sourceMap: false,
                                sourceMapContents: false
                            }
                        }
                    ]
                },
                {
                    test: /\.(jpg|png|gif|svg|webp)$/,
                    loader: 'image-webpack-loader',
                    enforce: 'pre'
                },
                {
                    test: /\.(jpe?g|png|gif|webp)$/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: 20 * 1024,
                                name: 'static/media/[name].[hash:8].[ext]'
                            }
                        },
                    ]
                },
                {
                    test: /\.svg$/,
                    loader: 'svg-url-loader',
                    options: {
                        limit: 20 * 1024,
                        noquotes: true,
                        name: 'static/media/[name].[hash:8].[ext]'
                    }
                },
                {
                    test: /\.(woff2?|woff|eot|ttf|otf)(\?.*)?$/,
                    loader: 'url-loader',
                    options: {
                        limit: 20 * 1024,
                        name: 'static/media/[name].[hash:8].[ext]'
                    }
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: pkg.title,
                description: pkg.description,
                keywords: pkg.keywords,
                author: pkg.author,
                appMountId: pkg.name,
                template: './index.html',
                inject: 'body',
                minify: true,
                chunks: ['turbolink_head', 'polyfill', 'app'],
                googleAnalytics: {
                    trackingId: 'UA-XXXX-XX',
                    pageViewOnLoad: true
                },
                window: {
                    env: {
                        apiHost: 'http://myapi.com/api/v1'
                    }
                }
            }),
            new HtmlWebpackInjector(),
            ...utils.pages(env),
            new CleanWebpackPlugin(buildPath),
            new FaviconsWebpackPlugin({
                logo: './sources/assets/icon.png',
                prefix: 'icons/',
                persistentCache: true,
                inject: true,
                background: '#fff',
                title: pkg.title,
                icons: {
                    android: false,
                    appleIcon: false,
                    appleStartup: false,
                    coast: false,
                    favicons: true,
                    firefox: false,
                    opengraph: false,
                    twitter: false,
                    yandex: false,
                    windows: false
                }
            }),
            new MiniCssExtractPlugin({
                filename: '[name].[contenthash].css',
                chunkFilename: "[id].[contenthash].css"
            }),
            new OptimizeCssAssetsPlugin({
                cssProcessor: require('cssnano'),
                cssProcessorOptions: {
                    map: {
                        inline: false,
                    },
                    discardComments: {
                        removeAll: true
                    }
                },
                canPrint: true
            })
        ]
    }
};
