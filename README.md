# flexpack

## 一、规范

代码风格统一以及代码提交信息统一

### 1、提交规范
    方案一：检测成功之后还是提交，暂未找到原因，先放弃
    1、commitlint
    2、husky

```javascript
    npm install -g @commitlint/cli @commitlint/config-conventional

    //生成配置文件
    echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js
```
    方案二：参考 [人人贷大前端技术中心的技术方案](http://http://blog.leanote.com/freewalk)
    1. type
    type为必填项，用于指定commit的类型，约定了feat、fix两个主要type，以及docs、style、build、refactor、revert五个特殊type，其余type暂不使用。
```javascript
    # 主要type
    feat:     增加新功能
    fix:      修复bug

    # 特殊type
    docs:     只改动了文档相关的内容
    style:    不影响代码含义的改动，例如去掉空格、改变缩进、增删分号
    build:    构造工具的或者外部依赖的改动，例如webpack，npm
    refactor: 代码重构时使用
    revert:   执行git revert打印的message

    # 暂不使用type
    test:     添加测试或者修改现有测试
    perf:     提高性能的改动
    ci:       与CI（持续集成服务）有关的改动
    chore:    不修改src或者test的其余修改，例如构建过程或辅助工具的变动

```
    2. scope
    scope也为必填项，用于描述改动的范围，格式为项目名/模块名，例如：
    node-pc/common rrd-h5/activity，而we-sdk不需指定模块名。如果一次commit修改多个模块，建议拆分成多次commit，以便更好追踪和维护。

    3. body
    body填写详细描述，主要描述改动之前的情况及修改动机，对于小的修改不作要求，但是重大需求、更新等必须添加body来作说明。

    4. break changes
    break changes指明是否产生了破坏性修改，涉及break changes的改动必须指明该项，类似版本升级、接口参数减少、接口删除、迁移等。

    5. affect issues
    affect issues指明是否影响了某个问题。例如我们使用jira时，我们在commit message中可以填写其影响的JIRA_ID，若要开启该功能需要先打通jira与gitlab。参考文档：docs.gitlab.com/ee/user/pro…

    ```javascript
        re #JIRA_ID
        fix #JIRA_ID
    ```


### 2、开发规范

    1)、eslint 

    2)、参考https://github.com/AlloyTeam/eslint-config-alloy

    3）、结合prettier使用，AlloyTeam规则建议

    4) webpack配合elint-loader 使用 具体使用参考https://github.com/webpack-contrib/eslint-loader

    结论：eslint + eslint-loader + prettier完美配合

## 二、基本功能

    1、ES新特性
       
       bable-loader

    2、webpack-dev-serve

        常见的用法是热更新以及代理接口解决跨域问题

    3、css less sass

      css-loader用于加载.css文件，并且转换成commonjs对象

      style-loader将样式通过style标签插入到head中

      ```
      // 安装
      npm i style-loader css-loader -D
      ```

      ```
      //配置
      module: {
        rules:[
            {
                test: \/.css$\,
                use:[
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    }

    ```
    less-loader
    用于将less转为css

    ```
    //安装
    cnpm i less less-loader -D
    ```
    ```
    {
       test: /\.less$/,
       use:[
           'style-loader',
           'css-loader',
           'less-loader'
       ]
    }
    ```

    sass-loader
    ```
    npm install sass  sass-loader node-sass  --save-dev
    ```
    ```
    module: {
        rules: [{
            test: /\.scss$/,
            use: [
                "style-loader", // 将 JS 字符串生成为 style 节点
                "css-loader", // 将 CSS 转化成 CommonJS 模块
                "sass-loader" // 将 Sass 编译成 CSS，默认使用 Node Sass
            ]
        }]
    }
    ```

    4、字体

    阿里图标库https://www.iconfont.cn/

    如何使用呢？

    ```
    @font-face {
    font-family: 'iconfont';
    src: url('../../assets/font/iconfont.eot');
    src: url('../../assets/font/iconfont.eot?#iefix') format('embedded-opentype'),
        url('../../assets/font/iconfont.woff2') format('woff2'),
        url('../../assets/font/iconfont.woff') format('woff'),
        url('../../assets/font/iconfont.ttf') format('truetype'),
        url('../../assets/font/iconfont.svg#iconfont') format('svg');
    }

    .iconfont {
    font-family: "iconfont" !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    }

    // 在html中
    <span class="iconfont">&#xe872;</span>
    ```

    配置
    ```
    {
         test: /\.(png|git|svg|jpg)$/, //同图片
         use:[
             {
                 loader: 'file-loader'
             }
         ]
     },
     {
         test: /\.(woff|woff2|eot|ttf|otf)$/,
         use: 'file-loader'
     }
    ```

    5、文件hash

       图片和字体

       css:
       ```
       const MiniCssExtractPlugin = require("mini-css-extract-plugin");
       module.exports = {
       plugins: [
           new MiniCssExtractPlugin({
           // Options similar to the same options in webpackOptions.output
           // both options are optional
           filename: "[name].css",
           chunkFilename: "[id].css"
           })
       ],
       module: {
           rules: [
           {
               test: /\.css$/,
               use: [
               {
                   loader: MiniCssExtractPlugin.loader,
                   options: {
                   // you can specify a publicPath here
                   // by default it use publicPath in webpackOptions.output
                   publicPath: '../'
                   }
               },
               "css-loader"
               ]
           }
           ]
       }
       }
       ```
 
    6、代码压缩

    JS： webpack4内置了 uglifyjs-webpack-plugin
    
    css文件压缩

    ```
    //使用optimize-css-assets-webpack-plugin
    //同时使用cssnano

    plugins:[
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/,
            cssProcessor: require('cssnano')
        })
    ]
    ```

    7、支持vue

    [参考](https://vue-loader.vuejs.org/zh/guide/#vue-cli)

    ```!
    注意：1、一起安装vue-loader和vue-template-compiler; 
    ```
    ```!
    注意：2、Vue loader的配置和其它的loader不太一样。需要额外配置中添加vue loader插件；
    ```

    //webpack.config.js
    //功能：将你定义过的其它规则复制并应用到.vue文件里相应语言的模块。
    const VueLoaderPlugin = require('vue-loader/lib/plugin');

        module.exports = {
        module: {
            rules:[
                {
                    test: /\.vue$/,
                    use: 'vue-loader'
                }
            ]
        },
        plugins:[
            new VueLoaderPlugin()
        ]
    }
    ```

    8、html生成

    html-webpack-plugin
    First:
    ```
    npm i -D html-webpack-plugin
    ````
    simple use like this:
    ```
    var HtmlWebpackPlugin = require('html-webpack-plugin');
    var path = require('path');

    module.exports = {
    entry: 'index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'index_bundle.js'
    },
    plugins: [new HtmlWebpackPlugin()]
    };
    ```



       