const _ = require('lodash');
const webpack = require('webpack');
/*
 * Webpack Plugins
 */
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
const packageSort = (a, b) => {
    switch (a.names[0]) {
        case 'polyfills':
            return -1;
        case 'main':
            return 1;
        case 'vendor':
            return -1;
        default:
            return 1;
    }
}

module.exports = {
    debug: true,

    context: __dirname + '/src',

    entry: {
        'polyfills': './polyfills.ts',
        'vendor': './vendor.ts',
        'main': './main.ts'
    },

    modulesDirectories: ['node_modules'],

    output: {
        filename: '[name].bundle.js',
        sourceMapFilename: '[name].map',
        path: '../dist',
        chunkFilename: '[id].chunk.js'
    },

    devtool: 'cheap-module-source-map',

    resolve: {
        extensions: [
            '', '.ts', '.js'
        ]
    },

    module: {
        loaders: [
            /*
             * Typescript loader support for .ts and Angular 2 async routes via .async.ts
             *
             * See: https://github.com/s-panferov/awesome-typescript-loader
             */
            {
              test: /\.ts$/,
              loader: 'awesome-typescript-loader',
              exclude: [/\.(spec|e2e)\.ts$/]
            },

            /*
             * Json loader support for *.json files.
             *
             * See: https://github.com/webpack/json-loader
             */
            {
              test: /\.json$/,
              loader: 'json-loader'
            },

            /*
             * Raw loader support for *.css files
             * Returns file content as string
             *
             * See: https://github.com/webpack/raw-loader
             */
            {
              test: /\.css$/,
              loader: 'raw-loader'
            },

            /* Raw loader support for *.html
             * Returns file content as string
             *
             * See: https://github.com/webpack/raw-loader
             */
            {
              test: /\.html$/,
              loader: 'raw-loader',
              exclude: ['./index.html']
            }
        ]
    },

    plugins: [
        /*
         * Plugin: ForkCheckerPlugin
         * Description: Do type checking in a separate process, so webpack don't need to wait.
         *
         * See: https://github.com/s-panferov/awesome-typescript-loader#forkchecker-boolean-defaultfalse
         */
        new ForkCheckerPlugin(),

        /*
         * Plugin: OccurenceOrderPlugin
         * Description: Varies the distribution of the ids to get the smallest id length
         * for often used ids.
         *
         * See: https://webpack.github.io/docs/list-of-plugins.html#occurrenceorderplugin
         * See: https://github.com/webpack/docs/wiki/optimization#minimize
         */
        new webpack.optimize.OccurenceOrderPlugin(true),

        /*
         * Plugin: CommonsChunkPlugin
         * Description: Shares common code between the pages.
         * It identifies common modules and put them into a commons chunk.
         *
         * See: https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
         * See: https://github.com/webpack/docs/wiki/optimization#multi-page-app
         */
        new webpack.optimize.CommonsChunkPlugin({
          name: ['vendor', 'polyfills']
        }),

        /*
         * Plugin: CopyWebpackPlugin
         * Description: Copy files and directories in webpack.
         *
         * Copies project static assets.
         *
         * See: https://www.npmjs.com/package/copy-webpack-plugin
         */
        // new CopyWebpackPlugin([{
        //   from: 'src/assets',
        //   to: 'assets'
        // }]),

        /*
         * Plugin: HtmlWebpackPlugin
         * Description: Simplifies creation of HTML files to serve your webpack bundles.
         * This is especially useful for webpack bundles that include a hash in the filename
         * which changes every compilation.
         *
         * See: https://github.com/ampedandwired/html-webpack-plugin
         */
        new HtmlWebpackPlugin({
          title: 'Angular2 Todo',
          showErrors: true,
          chunksSortMode: packageSort
        })
    ],

    devServer: {
        port: '8080',
        host: '127.0.0.1',
        historyApiFallback: true,
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        },
        outputPath: './dist'
    }
}
