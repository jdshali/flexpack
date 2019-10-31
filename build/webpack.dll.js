const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: "production",
    entry: {
        library: [
            'vue'
        ]
    },
    output: {
        filename: '[name].dll.js',
        path: path.join(__dirname, '../build/library'),
        library: '[name]'
    },
    plugins: [
        new webpack.DllPlugin({
            name: '[name]',
            path: path.join(__dirname, '../build/library/[name].json')
        })
    ]
};