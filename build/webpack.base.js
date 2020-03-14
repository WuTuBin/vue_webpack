const merge = require("webpack-merge");
const parts = require("./webpack.parts")    //引入配置零件文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const {resolve} = require('./lib')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const config = {
    //书写公共配置 
    entry: './src/main.js',
    output: {
        filename: '[name].js',
        path: resolve('../dist'), // 构建到目标目录
        // publicPath: 
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: ['babel-loader'],
                exclude: /node_modules/ //排除 node_modules 目录
            },
            {
                test: /\.vue/,
                use: 'vue-loader'
            },
            {
                test: /\.(png|jpg|gif|jpeg|webp|svg|eot|ttf|woff|woff2)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            // 不设置，默认转成base64
                            limit: 10240, //10K 资源大小小于 10K 时，将资源转换为 base64，超过 10K，将图片拷贝到 dist 目录
                            //默认情况下，生成的文件的文件名就是文件内容的 MD5 哈希值并会保留所引用资源的原始扩展名
                            name: '[name]_[hash:6].[ext]',
                            esModule: false // <img src={require('XXX.jpg')} /> 会出现 <img src=[Module Object] />
                        }
                    }
                ],
                // exclude: /node_modules/
            },
            {
                test: /\.(le|c)ss$/,
                use: ['style-loader', 'css-loader', {
                    loader: 'postcss-loader',
                    options: {
                        plugins: function () {
                            return [
                                require('autoprefixer')({
                                    "overrideBrowserslist": [
                                        ">0.25%",
                                        "not dead"
                                    ]
                                })
                            ]
                        }
                    }
                }, 'less-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', {
                    loader: 'postcss-loader',
                    options: {
                        plugins: function () {
                            return [
                                require('autoprefixer')({
                                    "overrideBrowserslist": [
                                        ">0.25%",
                                        "not dead"
                                    ]
                                })
                            ]
                        }
                    }
                }, 'sass-loader'],
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        //不需要传参数喔，它可以找到 outputPath
        new CleanWebpackPlugin(),
        //使用vue 请确保引入这个插件！
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            title: "vue-webpack", //用于生成的HTML文档的标题。
            filename: "index.html", // 生成的模板文件的名字 默认index.html
            template: "./public/index.html", //模板来源文件
            // inject: false, //注入位置'head','body',true,false
            // favicon: "", //指定页面图标
            // minify: {
            //     caseSensitive: false, ////是否大小写敏感
            //     collapseBooleanAttributes: true, //是否简写boolean格式的属性如：disabled="disabled" 简写为disabled 
            //     collapseWhitespace: true //是否去除空格
            // },
            // hash: true, //是否生成hash添加在引入文件地址的末尾，类似于我们常用的时间戳，这个可以避免缓存带来的麻烦
            // cache: true, //是否需要缓存，如果填写true，则文件只有在改变时才会重新生成
            // showErrors: true, //是否将错误信息写在页面里，默认true，出现错误信息则会包裹在一个pre标签内添加到页面上
            // chunks: ['a', 'b'], //引入的a,b模块，这里指定的是entry中设置多个js时，在这里指定引入的js，如果不设置则默认全部引入,数组形式传入
            // chunksSortMode: "auto", //引入模块的排序方式
            // excludeChunks: ['a', 'b'], //排除的模块,引入的除a,b模块以外的模块，与chunks相反
            // xhtml: false //生成的模板文档中标签是否自动关闭，针对xhtml的语法，会要求标签都关闭，默认false
        })
    ],
    // 解析模块请求的选项
    // （不适用于对 loader 解析）
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js', // vue/dist目录下有多个以vue开头的文件，‘vue$’是精准匹配vue.esm.js(包含编译器)
            "@": '../src'
        },
        // 使用的扩展名
        extensions: [".js", ".jsx", ".css",".vue"],
    }  
}
module.exports = merge([
    config,
    // parts.loadCSS({
    //     reg : /\.less/,
    //     use : ["less-loader"]
    // }),
    // parts.loadCSS(),
])