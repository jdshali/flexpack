const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');

module.exports = merge(baseConfig, {
    devServer: {
        compress: true,
        port: 9000,
        stats: '' //errors-only
    }
});

