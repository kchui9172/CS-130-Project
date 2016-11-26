var path = require('path');
var webpack = require('webpack');

var config = {
    devtool: 'cheap-module-eval-source-map',
    entry: [
        './js/index.js',
        'webpack-hot-middleware/client'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/dist/'
    },
    plugins: [
        new webpack.DefinePlugin({"process.env":{NODE_ENV:JSON.stringify("production")}}),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.NoErrorsPlugin()
    ],
    resolve: {
    alias: {'css': path.join(__dirname, 'static/css'),},
    extensions: ['', '.js', '.jsx', '.css']
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel'],
                exclude: /node_modules/
            },
            {
                test: /\.css?$/,
                loaders: [ 'style-loader', 'css-loader' ],
                include: __dirname
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192',
                exclude: /node_modules/
            }
        ]
    }
};

module.exports = config;
