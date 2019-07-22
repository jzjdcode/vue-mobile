const path = require("path")
const htmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// vue-loader 必要的插件
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    // 模式
    mode: "development",
    // 入口
    entry: path.join(__dirname, './src/main.js'),
    //出口
    output: {
        path: path.join(__dirname, "./dist"),
        filename: "bundle.js"
    },
    // 插件
    plugins: [
        new htmlWebPackPlugin({
            template: path.join(__dirname, "./src/index.html")
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css",
            chunkFilename: "[name].[contenthash].css"
        }),
        // new 实例
        new VueLoaderPlugin()
    ],
    // 第三方loader加载模块
    module: {
        rules: [
            // 处理 css 文件loader
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            },
            // 默认情况下，webpack 无法处理 css 文件中的url 地址，不管图片还是字体库
            // 处理 图片加载路径 loader
            // { test: /\.(jpg|png|gif|bmp|jpeg)$/, use: ['url-loader?limit=10000&name=[hash:8]-[name].[ext]'] }, // limit 给定的值是图片的大小，单位是 byte(字节)，如果我们引用的图片大于或等于给定的limit值，则不会转为base64格式的字符串，如果图片小于给定的limit 值，则会转为base64格式字符串
            // 图片小于8192byte 会自动转为base64格式字符串
            { // 处理 图片加载路径 loader
                test: /\.(jpg|png|gif|bmp|jpeg)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'images/[hash:8]-[name].[ext]'
                }
            },
            { // 配置处理 .less 
                test: /\.less$/,
                use: ["style-loader", "css-loader", "less-loader"]
            },
            { // 配置字体文件规则
                test: /\.(ttf|eot|svg|woff|woff2)$/,
                use: 'url-loader'
            },
            { // 配置处理 es6或更高级语法规则
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },

            { // 配置 vue 文件规则
                test: /\.vue$/,
                use: "vue-loader"
            }
        ]
    },
    // resovle: {
    //     alias: { 
    //     }
    // }


}