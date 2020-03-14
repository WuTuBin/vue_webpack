const merge = require("webpack-merge");
const apiMocker = require('mocker-api');
const path = require('path')
// const parts = require("./webpack.parts");   //引入配置零件文件
const config = {
    //书写公共配置
    devtool: 'cheap-module-eval-source-map', //开发环境下使用
    devServer: {
        // 提供在服务器内部所有其他中间件之前执行自定义中间件的能力
        before(app){
            apiMocker(app, path.resolve('./mock/mocker.js'))
        },
        hot: true,
        stats: 'errors-only', // 控制台只在发生错误时输出
        
    }
}
module.exports = merge([
    config,
    // parts
])