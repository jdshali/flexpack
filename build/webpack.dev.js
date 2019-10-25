const path = require('path');

console.log('__dirname', __dirname)

module.exports = {
   mode: "development",
   entry: path.join(__dirname, `../src/index/index.js`),
   output: {
       path: path.resolve(__dirname, '../dist'), 
       filename: '[name].js'
   }
}