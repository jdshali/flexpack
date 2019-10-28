const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");//css文件hash
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');//css文件压缩
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');//html
const glob = require('glob');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

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
            use: 'babel-loader'
        }, 
        {
            test: /\.vue$/,
            use: 'vue-loader'
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
            test: /\.less/,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                {
                    loader: 'px2rem-loader',
                    options: {
                        remUnit: 75,
                        remPrecision: 8
                    }
                } ,
                'less-loader',
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
                "sass-loader", // 将 Sass 编译成 CSS，默认使用 Node Sass
                {
                    loader: 'postcss-loader',
                    options: {
                        plugins: () => [
                            require('autoprefixer')({ overrideBrowserslist: ['iOS >= 7', 'Android >= 4.0'] })
                        ]
                    }
                },
                // {
                //     loader: 'px2rem-loader',
                //     options: {
                //         remUnit: 75,
                //         remPrecision: 8
                //     }
                // }
            ]
        },
        {
            test: /\.(png|git|svg|jpg)$/, //同图片
            use:[
                {
                    loader: 'file-loader',
                    options:{
                        name: '[name]_[hash:8].[ext]',
                        outputPath: 'images'
                    }
                }
            ]
        },
        {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            use: [{
                loader: 'file-loader',
                options:{
                    name: '[name]_[hash:8].[ext]',
                    outputPath: 'font'
                    // outputPath: function(url, resourcePath, context) {
                    //     //console.info(url, resourcePath, context)
                    //     return '/font/'
                    // }
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
    new VueLoaderPlugin(), //vue 支持
   ].concat(htmlWebpackPlugins),
   devServer: {
    //contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
  }
}