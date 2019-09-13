'use strict';
const path = require('path');

const APPDIR = 'app/';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
    template: path.resolve(__dirname, APPDIR, 'index.html'),
    filename: 'index.html',
    inject: 'body'
});

const config = {
    mode: 'development',
    context: path.resolve(__dirname, APPDIR),
    entry: './main.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {test: /\.js$/, use:
             {
                 loader: 'babel-loader',
                 options:
                 {
                     presets: [
                         ['@babel/preset-env'], '@babel/react'
                     ]
                 }
             }
            },{
                test: /\.css$/,
                use: [
                    // style-loader
                    {loader: 'style-loader'},
                    // css-loader
                    {loader: 'css-loader',
                     options: {
                         modules: true
                     }
                    }]
            },{
                test: /\.(png|jpg|jpeg|gif|woff)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }]
            },{
                test: /\.README$/,
                use: 'null-loader'
            }
        ]
    },
    plugins: [HTMLWebpackPluginConfig],

    node: {
        fs: "empty" // This is to account for what appears to be a bug: https://github.com/josephsavona/valuable/issues/9`
    }
};

module.exports = config;
