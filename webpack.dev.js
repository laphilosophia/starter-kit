const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInjector = require('html-webpack-injector');
const GoogleFontsPlugin = require("@beyonk/google-fonts-webpack-plugin");
const utils = require('./sources/pages');
const pkg = require('./package.json');

module.exports = env => {
    return {
        devtool: 'eval-cheap-module-source-map',
        entry: {
            polyfill: '@babel/polyfill',
            app: './sources/index.js'
        },
        devServer: {
            contentBase: path.join(__dirname, "dist"),
            historyApiFallback: true,
            port: 3000,
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
                            loader: "style-loader",
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                outputStyle: 'expanded',
                                sourceMap: true,
                                sourceMapContents: true
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
                    use: [{
                        loader: 'url-loader',
                        options: {
                            limit: 20 * 1024,
                            name: 'static/media/[name].[hash:8].[ext]'
                        }
                    }]
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
                inject: true
            }),
            ...utils.pages(env),
            new GoogleFontsPlugin({
                fonts: [
                    {
                        family: "Karla",
                        variants: [ "400", "700", "latin-ext" ]
                    },
                    {
                        family: "Montserrat",
                        variants: [ "400", "600", "800", "latin-ext" ]
                    }
                ]
            })
        ]
    }
};
