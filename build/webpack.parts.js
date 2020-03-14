exports.loadCSS = ({reg = /\.css$/,include,exclude,uses = []} = {}) => ({
    module : {
        rules:[
            {
                test : reg,
                include,
                exclude,
                use: [
                    { loader : "style-loader" },
                    { loader : "css-loader" }
                ].concat(uses),
            }
        ]
    }
})