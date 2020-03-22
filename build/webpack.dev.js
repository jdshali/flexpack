const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');

module.exports = merge(baseConfig, {
    devServer: {
        compress: true,
        port: 9000,
        stats: '', //errors-only
        proxy:{
            '/mock': {
                target: 'http://yapi.demo.qunar.com',
                secure: false,
                changeOrigin: true
            }
        }
    }
});

