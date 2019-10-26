const path = require('path');

console.log('__dirname', __dirname)

module.exports = {
   mode: "production",
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
                'style-loader',
                'css-loader'
            ]
        },
        {
            test: /\.less$/,
            use:[
                'style-loader',
                'css-loader',
                'less-loader'
            ]
        },
        {
            test: /\.scss$/,
            use: [
                "style-loader", // 将 JS 字符串生成为 style 节点
                "css-loader", // 将 CSS 转化成 CommonJS 模块
                "sass-loader" // 将 Sass 编译成 CSS，默认使用 Node Sass
            ]
        }
       ]
   }
}