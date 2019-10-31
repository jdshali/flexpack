const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");//css文件hash
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');//css文件压缩
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');//html
const glob = require('glob');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');//抽离公共包 通过cdn
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');//打印日志优化
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

const PurgecssPlugin = require('purgecss-webpack-plugin');

const HappyPack = require('happypack');//多进程
const os = require('os');

const happyThreadPool = HappyPack.ThreadPool({
    size: os.cpus().length || 3
});

const PATHS = {
    src: path.join(__dirname, '../src')
};



const getMpaSet = () => {
    const entry = {};
    const htmlWebpackPlugins = [];

    const entryFiles = glob.sync(path.join(__dirname, '../src/*/index.js'));
    /*
        [ 
            'D:/code/mycode/webpack/jk-webpack/src/index/index.js',
            'D:/code/mycode/webpack/jk-webpack/src/vue/index.js' 
        ]
    */

    Object.keys(entryFiles)
        .map((index) => {
            const entryFile = entryFiles[index];

            const match = entryFile.match(/src\/(.*)\/index.js/);
            const pagename = match && match[1];

            entry[pagename] = entryFile;
            htmlWebpackPlugins.push(
                new HtmlWebpackPlugin({
                    template: path.join(__dirname, `../src/${pagename}/index.html`),
                    filename: `${pagename}.html`,
                    chunks: ['commons', pagename],
                    inject: true,
                    // minify: {
                    //     html5: true,
                    //     collapseWhitespace: true,
                    //     preserveLineBreaks: false,
                    //     minifyCSS: true,
                    //     minifyJS: true,
                    //     removeComments: true
                    // }
                }))
        })

    console.log('entry files: ', entryFiles);
    return {
        entry,
        htmlWebpackPlugins
    }
}

const { entry, htmlWebpackPlugins } = getMpaSet();

module.exports = {
    mode: "development",
    entry: entry,
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name]_[chunkhash].js'
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
                use: 'babel-loader',
               // use: ['happypack/loader?id=babel'],
                exclude: /node_modules/
            },
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: [
                    //'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader' 
                ]
            },
            {
                test: /\.less/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'happypack/loader?id=cssStyles',
                    {
                        loader: 'px2rem-loader',
                        options: {
                            remUnit: 75,
                            remPrecision: 8
                        }
                    },
                    'happypack/loader?id=lessStyles',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [
                                require('autoprefixer')({ overrideBrowserslist: ['iOS >= 7', 'Android >= 4.0'] })
                            ]
                        }
                    },

                ]
            },
            {
                test: /\.scss$/,
                use: [
                    //"style-loader", // 将 JS 字符串生成为 style 节点
                    MiniCssExtractPlugin.loader,
                    "css-loader", // 将 CSS 转化成 CommonJS 模块
                    {
                        loader: 'px2rem-loader',
                        options: {
                            remUnit: 75,
                            remPrecision: 8
                        }
                    },
                    "sass-loader", // 将 Sass 编译成 CSS，默认使用 Node Sass
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [
                                require('autoprefixer')({ overrideBrowserslist: ['iOS >= 7', 'Android >= 4.0'] })
                            ]
                        }
                    },

                ]
            },
            // {
            //     test: /\.(png|git|svg|jpg)$/, //同图片
            //     use: ['happypack/loader?id=ImgLoader']
            // },
            {
                test: /\.(png|git|svg|jpg)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name]_[hash:8].[ext]',
                        outputPath: 'images'
                    }
                }]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name]_[hash:8].[ext]',
                        outputPath: 'font'
                    }
                }]
            },
            // {
            //     test: /\.(woff|woff2|eot|ttf|otf)$/,
            //     use: ['happypack/loader?id=fontLoader']
            // },
            {
                test: /\.txt$/i,
                use: 'raw-loader',
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name]_[contentHash:8].css'
        }),//css文件hash
        new OptimizeCssAssetsPlugin({
            assetNmaeRegExp: /\.css$/g,
            cssProcessor: require('cssnano')
        }),//css 文件压缩
        new VueLoaderPlugin(), //vue 支持,
        // new HtmlWebpackExternalsPlugin({//基础库抽离
        //     externals: [
        //         {
        //             module: 'vue',
        //             entry: 'https://cdn.jsdelivr.net/npm/vue/dist/vue.js',
        //             global: 'Vue'
        //         }
        //     ]
        // }),
        //new BundleAnalyzerPlugin(), 
        //new FriendlyErrorsWebpackPlugin(),
        // new HappyPack({
        //     id: 'babel',
        //     // 需要使用的 loader，用法和 rules 中 Loader 配置一样
        //     // 可以直接是字符串，也可以是对象形式
        //     loaders: ['babel-loader?cacheDirectory=true'],
        //     threadPool: happyThreadPool
        // }),
        new HappyPack({
            id: 'lessStyles',
            loaders: ['less-loader'],
            threadPool: happyThreadPool
        }),
        new HappyPack({
            id: 'cssStyles',
            loaders: ['css-loader'],
            threadPool: happyThreadPool,
        }),
        // new HappyPack({
        //     id: 'ImgLoader',
        //     loaders: [{
        //         loader: require.resolve('file-loader'),
        //         name: '[name]_[hash:8].[ext]',
        //     //             outputPath: 'font'
        //     }],
        //     threadPool: happyThreadPool,
        // }),
        // new HappyPack({
        //     id: 'fontLoader',
        //     loaders: [{
        //         loader: require.resolve('file-loader'),
        //         options: {
        //             name: '[name]_[hash:8].[ext]',
        //             outputPath: 'font'
        //         }
        //     }],
        //     threadPool: happyThreadPool,
        // }),
        new webpack.DllReferencePlugin({
            manifest: require('../build/library/library.json')
        }),
        //new HardSourceWebpackPlugin(),
        new PurgecssPlugin({
            paths: glob.sync(`${PATHS.src}/**/*`,  { nodir: true }),
        })
        
    ].concat(htmlWebpackPlugins),
    resolve: {
        alias: {
            'vue': path.resolve(__dirname, '../node_modules/vue/dist/vue.runtime.common.js'),
            'utils': path.resolve(__dirname, '../utils/')
        },
        extensions: ['.js'],
        //mainFields: ['main']
    }
}