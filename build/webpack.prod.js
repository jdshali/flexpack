const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");//css文件hash
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');//css文件压缩


console.log('__dirname', __dirname)

module.exports = {
    mode: 'production',
   entry: path.join(__dirname, `../src/index/index.js`),
   output: {
       path: path.resolve(__dirname, '../dist'), 
       filename: '[name].js'
   },
   module: {
    rules: [
        {   
            enforce: 'pre',
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'eslint-loader',
            options: {
                fix: true,
            },
        },
        {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: 'babel-loader'
        }, 
        {
            test: /\.css$/,
            use:[
                //'style-loader',
                MiniCssExtractPlugin.loader,
                'css-loader'
            ]
        },
        {
            test: /\.less$/,
            use:[
                //'style-loader',
                MiniCssExtractPlugin.loader,
                'css-loader',
                'less-loader'
            ]
        },
        {
            test: /\.scss$/,
            use: [
                //"style-loader", // 将 JS 字符串生成为 style 节点
                MiniCssExtractPlugin.loader,
                "css-loader", // 将 CSS 转化成 CommonJS 模块
                "sass-loader" // 将 Sass 编译成 CSS，默认使用 Node Sass
            ]
        },
        {
            test: /\.(png|git|svg|jpg)$/, //同图片
            use:[
                {
                    loader: 'file-loader',
                    options:{
                        name: '[name]_[hash:8].[ext]'
                    }
                }
            ]
        },
        {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            use: [{
                loader: 'file-loader',
                options:{
                    name: '[name]_[hash:8].[ext]'
                }
            }]
        }
       ]
   },
   plugins:[
    new MiniCssExtractPlugin({
        filename: '[name]_[contentHash:8].css'
    }),//css文件hash
    new OptimizeCssAssetsPlugin({
        assetNmaeRegExp: /\.css$/g,
        cssProcessor: require('cssnano')
    }),//css 文件压缩
   ]
}