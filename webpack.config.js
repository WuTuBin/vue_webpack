const baseCfg = require("./build/webpack.base");
const devCfg = require("./build/webpack.dev");
const prodCfg = require("./build/webpack.prod")
const merge = require("webpack-merge");

module.exports = mode => {
    if(mode === "production"){
        return merge(baseCfg,prodCfg,{mode});   
    }
    return merge(baseCfg,devCfg,{mode});
}