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
            test: /\.(js|vue)$/,
            loader: 'eslint-loader',
            enforce: 'pre',
            include: [path.join(__dirname, 'src')],
            options: {
                fix: true
            }
        } 
       ]
   }
}