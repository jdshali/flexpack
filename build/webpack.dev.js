const path = require('path');

console.log('__dirname', __dirname)

module.exports = {
   mode: "development",
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
       ]
   }
}