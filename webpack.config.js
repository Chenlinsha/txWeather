const path = require('path');
const { merge } = require('webpack-merge');
const devConfig = require('./webpack.dev.js');
const prodConfig = require('./webpack.prod.js');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


const commonConfig = {
    entry: './src/js/index.js',
    output: {
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                path: 'postcss.config.js'
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: 'public/index.html',
        }),
    ],
    devServer: {
        contentBase: './dist',    //配置开发服务运行时的文件根目录
        port: 5111,       //端口
        hot: true, //是否启用热更新
        open: false, //是否自动打开浏览器
    },
};

module.exports = env => {
    if (env && env.production) {
        return merge(commonConfig, prodConfig)
    } else {
        return merge(commonConfig, devConfig)
    }
};