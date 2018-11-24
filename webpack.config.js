const path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    MiniCssExtractPlugin = require('mini-css-extract-plugin'),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const devMode = process.env.NODE_ENV !== 'production';

const styleLoaders = (config = { withCssModules: false }) => {
    const afterCssLoader = [
        devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
    ];
    const beforeCssLoader = [
        postCSSLoader,
        'sass-loader'
    ];
    return [
        ...afterCssLoader,
        cssLoader(config.withCssModules, beforeCssLoader.length),
        ...beforeCssLoader
    ];
};

// https://medium.freecodecamp.org/how-i-integrated-css-modules-with-scss-into-my-react-application-32f473e1bb51
const cssLoader = (withCssModules = false, importLoaders = 0) => {
    let options = {
        modules: false,
        sourceMap: true,
        minimize: true,
        importLoaders
    };

    if (withCssModules) {
        options = {
            ...options,
            modules: true,
            localIdentName: '[name]__[local]__[hash:base64:5]',
        }
    }

    return {
        loader: 'css-loader',
        options
    };
};

const postCSSLoader = {
    loader: 'postcss-loader',
    options: {
        ident: 'postcss',
        sourceMap: true,
        plugins: () => [
            require('autoprefixer')({
                'browsers': ['> 1%', 'last 2 versions']
            }),
            require('cssnano')({
                preset: 'default',
            })
        ],
    }
};

module.exports = {
    entry: './src/index.tsx',
    output: {
        // https://survivejs.com/webpack/optimizing/adding-hashes-to-filenames/#placeholders
        filename: 'bundle.[chunkhash].js',
        path: path.resolve(__dirname, 'dist'),
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: 'source-map',

    devServer: {
        // Parse host and port from env to allow customization.
        //
        // If you use Docker, Vagrant or Cloud9, set
        // host: options.host || "0.0.0.0";
        //
        // 0.0.0.0 is available to all network devices
        // unlike default `localhost`.

        host: process.env.HOST, // Defaults to `localhost`
        port: process.env.PORT, // Defaults to 8080
        open: true, // Open the page in browser
        overlay: true // provide an overlay for capturing compilation related warnings and errors

    },

    // Add '.ts', '.tsx', '.js', and '.json' as resolvable extensions.
    resolve: { extensions: ['.ts', '.tsx', '.js', '.json'] },

    // https://webpack.js.org/plugins/mini-css-extract-plugin/#extracting-all-css-in-a-single-file
    optimization: {
        minimizer: [

            // https://webpack.js.org/configuration/optimization/
            new UglifyJsPlugin({

                // https://github.com/webpack-contrib/uglifyjs-webpack-plugin#sourcemap
                sourceMap: true
            })
        ],
        splitChunks: {
            cacheGroups: {
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true
                }
            }
        }
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: 'awesome-typescript-loader' },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },

            // All files with a '.scss', '.sass' or '.css' extension will be handled by 'css-loader & sass-loader'.
            {
                test: /\.(sa|sc|c)ss$/,
                exclude: /\.module\.(sa|sc|c)ss$/,
                use: styleLoaders()
            },
            {
                test: /\.module\.(sa|sc|c)ss$/,
                use: styleLoaders({ withCssModules: true })
            },
        ]
    },

    plugins: [

        // to clean the ./dist folder before regenerating files.
        new CleanWebpackPlugin('dist', {} ),

        // reloads webpack after file changes
        new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'index.html') }),

        new MiniCssExtractPlugin({
            filename: devMode ? '[name].css' : '[name].[hash].css',
            chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
        })
    ],

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM'
    }

};