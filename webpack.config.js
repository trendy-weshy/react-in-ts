/*
 * created by waweru
 */

'use strict';

const path=require('path');
const webpack=require('webpack');

// CONSTANT VARIABLES
const devMiddleware='webpack/hot/dev-server';
const hotMiddleware='webpack-hot-middleware/client';
const appEntry='./src/index.tsx';
const vendorEntry='./src/vendor.ts';
const publicPath='/build';
const outputPath=path.resolve(__dirname, './build/');
const devtool = (process.env.NODE_ENV!=='production') ? 'inline-source-map' : 'source-map';
const output='[name].build.js';

const common={
    output:{
        path: outputPath,
        filename: output,
        publicPath
    },
    performance: {
		hints: false
	},
    module: {
        rules: [
            { 
                enforce: "pre", 
                test: /\.js$/, 
                loader: "source-map-loader" 
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
	        },
            {
                test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
                loader: 'file-loader',
                options: {
                    name: 'fonts/[name].[ext]?[hash]'
                }
	        }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js'],
        modules: ['node_modules', 'bower_components'],
        enforceExtension: false,
    },
    plugins:[
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
                version: JSON.stringify(require('./package.json').version),
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor'],
            allChunks: true
        })
    ]
};

const dev={
    entry: {
        'app': [devMiddleware, hotMiddleware, appEntry],
        'vendor': [devMiddleware, hotMiddleware, vendorEntry]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ],
    module: {
        rules: [
            { 
                test: /\.tsx?$/, 
                loaders: ['react-hot-loader', 'webpack-module-hot-accept', 'awesome-typescript-loader']
            }
        ]
    }
};

const prod={
    entry: {
        'app': appEntry,
        'vendor': vendorEntry
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin()
    ],
    module: {
        rules: [
            { 
                test: /\.tsx?$/, 
                loader: 'awesome-typescript-loader'
            }
        ]
    }
}

module.exports.devtool=devtool;
if (process.env.NODE_ENV!=='production') {
    const loaders=Object.assign({}, common.module, {
        rules: [...common.module.rules, ...dev.module.rules]
    });
    module.exports=Object.assign({}, common, {
        plugins: [...common.plugins, ...dev.plugins],
        entry: dev.entry,
        module: { rules: [...common.module.rules, ...dev.module.rules] }
    });
}
else {
    module.exports=Object.assign({}, common, {
        plugins: [...common.plugins, ...prod.plugins],
        entry: prod.entry,
        module: { rules: [...common.module.rules, ...prod.module.rules] }
    });
}
