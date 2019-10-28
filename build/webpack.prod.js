const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = merge(baseConfig, {
    mode: 'production',
    plugins:[
     new CleanWebpackPlugin(),//清除目录
    ]
 });
  