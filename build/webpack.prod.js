const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack'); 
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const smp = new SpeedMeasureWebpackPlugin();



module.exports =  smp.wrap(merge(baseConfig, {
    mode: "production",
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
        },
        minimizer: [
            new TerserPlugin({
                parallel: true,
                cache: true
            })
        ]
    },
    stats: 'normal'// "none" | "errors-only" | "minimal" | "normal" | "detailed" | "verbose" | "errors-warnings"
}));


