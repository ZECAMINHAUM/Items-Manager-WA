const path = require('path');
const HtmlWebpakPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ['babel-polyfill', './src/index.js'],
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'index_bundle.js',
    },
    stats: {
        children: false
    }, 
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                },
                
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    plugins: [
        new HtmlWebpakPlugin({
            title: 'GDP - Desafio',
            template: path.resolve(__dirname, 'src/index.html'),
            filename: path.resolve(__dirname, 'dist/index.html'),
            minify: true
        })
    ],
    resolve: {
        extensions: ['.js', '.json', '.jsx'],
    },
    devServer: {
        historyApiFallback: true,
        
    }
    
}