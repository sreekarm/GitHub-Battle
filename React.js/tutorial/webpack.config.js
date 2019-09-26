//webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = {
    entry: ./app/index.js
    module: {
        rules: [
            {test: /\.svg$/, use: 'svg-inline-loader'}
            {test: /\.css$/, use: ['style-loader', 'css-loader']}
            {test: /\.(js)$/, use: 'babel-loader'}
        ]    
    }

    plugins: [
        new HtmlWebpackPlugin()
        new webpack.EnvironmentPlugin({
            'NODE_ENV': 'production'
        })
    ]

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index_bundle.js'
    }

    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development'
}