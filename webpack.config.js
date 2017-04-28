const path = require('path');
const webpack = require('webpack');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        bundle: path.join(__dirname, '/src/main.js')
    },
    output: {
        publicPath: './',
        path: path.join(__dirname, '/public/bundle'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                enforce: "pre",
                exclude: /node_modules/,
                loader: 'jshint-loader',
                options: {
                    camelcase: true,
                    emitErrors: true,
                    failOnHint: true,
                    esversion: 6
                }
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
                exclude: /node_modules/,
                options: {
                    interpolate: true,
                    minimize: true
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: [
                        'env'
                    ]
                }
            },
            {
                test: /\.sass$/,
                exclude: /node_modules/,
                loader: ExtractTextPlugin.extract({
                    fallbackLoader: "style-loader",
                    loader: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.json$/,
                exclude: /node_modules/,
                loader: 'json-loader'
            },
            {
                test: /\.(jpe?g|png|bmp|gif|svg|woff|woff2|eot|ttf|otf|obj|mtl|fbx|ogg|mp3)$/,
                exclude: /node_modules/,
                loader: 'url-loader',
                options: {
                    name: 'resources/[hash:12].[ext]',
                    limit: 1000
                }
            },
            {
                test: /\.glsl$/,
                exclude: /node_modules/,
                loader: 'shader-loader'
            }
        ]
    },
    plugins: [
        new WebpackCleanupPlugin(),
        new ExtractTextPlugin("styles.css")
    ],

    resolve: {
        modules: [
            path.join(__dirname, 'sources'),
            path.join(__dirname, 'node_modules')
        ]
    },

    devtool: 'eval source-map',

    devServer: {
        host: '0.0.0.0',
        port: 4200,
        inline: true,
        stats: {
            colors: true
        },
        compress: true,
        overlay: true,
        clientLogLevel: 'warning',
        contentBase: path.join(__dirname, '/public')
    }
};
