const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack'); 

module.exports = merge(baseConfig, {
    mode: 'development',
    plugins: [
        new CleanWebpackPlugin(),//清除目录
        new webpack.optimize.ModuleConcatenationPlugin(),//Scope hoisting 作用域提升 
    ],
    optimization: {
        splitChunks: {
            minSize: 0,
            cacheGroups: {
                commons: {
                    name: 'commons',
                    chunks: 'all',
                    minChunks: 1
                }
            }
        }
    },
    stats: 'normal'// "none" | "errors-only" | "minimal" | "normal" | "detailed" | "verbose" | "errors-warnings"
});
