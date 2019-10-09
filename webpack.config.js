let path = require('path');
let webpack = require('webpack');

const devFlagPlugin = new webpack.DefinePlugin({ __DEV__: true });

module.exports = {
    entry: './src/main/js/index.jsx',
    devtool: 'sourcemaps',
    cache: true,
    mode: 'development',
    output: {
        path: __dirname,
        filename: './src/main/resources/static/app.js'
    },
    resolve: { extensions: [ '.js', '.ts', '.jsx' ] },
    module: {
        rules: [
            {
                test: path.join(__dirname, '.'),
                exclude: /(node_modules)/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'stage-0', 'react']
                    }
                }]
            }
        ]
    },
    plugins: [
        devFlagPlugin
    ]
};
