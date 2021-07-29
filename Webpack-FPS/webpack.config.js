var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js' // bundle.js to wynik kompilacji projektu przez webpacka
    },
    devServer: {
        port: 8080
    },
    mode: 'development', // none, development, production
    plugins: [
        new HtmlWebpackPlugin({
            hash: true,
            filename: './index.html',
            title: "page title",
            template: './src/index.html',
            h1: "h1",
            h2: "h2"
        })
    ],
    module: {
        rules: [
            {
                test: /.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(md2)$/i,
                type: 'asset/resource',
            },
            {
                test: /.(png|jp(e*)g|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8000, // Convert images < 8kb to base64 strings
                        name: 'images/[hash]-[name].[ext]'
                    }
                }]
            }
        ]
    },
};