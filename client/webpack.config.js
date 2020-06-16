var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './index.jsx',
    output: {
        path: path.resolve('dist'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css']
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-3']
                }
            },
            { test: /\.css$/, loader: "style-loader!css-loader" }
        ]
    },
    devtool: 'eval-source-map',
    plugins: [new HtmlWebpackPlugin({
        template: './index.html',
        filename: 'index.html',
        inject: 'body'
    })],
    devServer: {
        disableHostCheck: true,
        port: 5145,
        host: '127.0.0.1',
        historyApiFallback: true
    }
}