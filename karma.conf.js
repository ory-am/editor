var webpack = require('webpack'),
    path = require('path');

// Karma configuration
// Generated on Mon May 11 2015 14:13:57 GMT-0600 (MDT)

module.exports = function (config) {
    config.set({
        basePath: './',
        frameworks: ['jasmine'],
        files: [
            'test/**/*.js',
            {
                pattern: 'src/app/*.js',
                watched: true, included: false, served: false
            },
            {
                pattern: 'src/app/**/*.js',
                watched: true, included: false, served: false
            }
        ],
        preprocessors: {
            'test/**/*.js': ['webpack']
        },
        webpack: {
            module: {
                loaders: [
                    {test: /\.js$/, loader: 'jsx-loader'},
                    {test: /\.less$/, loader: 'style!css!less'}
                ]
            },
            plugins: [
                new webpack.ResolverPlugin([
                    new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('bower.json', ['main'])
                ])
            ],
            resolve: {
                root: [path.resolve('src/bower_components'), path.resolve('./src')]
            }
        },
        webpackMiddleware: {
            noInfo: true
        },
        plugins: [
            require('karma-webpack'),
            require('karma-jasmine'),
            require('karma-chrome-launcher'),
            require('karma-firefox-launcher'),
            require('karma-safari-launcher')
            // TODO add opera launcher: https://github.com/ory-am/editor/issues/5
            // TODO add IE launcher: https://github.com/ory-am/editor/issues/6
        ],
        reporters: ['dots'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome', 'Firefox', 'Safari'],
        singleRun: false
    });
};
