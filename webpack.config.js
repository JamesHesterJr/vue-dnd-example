const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = env => {
    return {
        mode: 'development',
        entry: [
            './src/index.js',
            './src/index.html',
            './assets/sass/app.scss'
        ],
        devtool: 'inline-source-map',
        output: {
            filename: 'js/main.js',
            path: path.resolve('./public'),
            publicPath: '/'
        },
        module: {
            rules: [
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'sass-loader'
                    ]
                },
                {
                    test: /\.vue$/,
                    loader: 'vue-loader'
                },
                {
                    test: /\.html$/i,
                    use: ['html-loader', {
                        loader: 'file-loader',
                        options: {
                            name: '[name].html',
                        }
                    }]
                },
            ]
        },
        resolve: {
            extensions: ['.js', '.vue', '.webpack.js'],
            alias: {
                vue: 'vue/dist/vue.js'
            }
        },
        plugins: [
            new MiniCssExtractPlugin({filename: 'css/main.css'}),
            new VueLoaderPlugin()
        ]
    }
}
