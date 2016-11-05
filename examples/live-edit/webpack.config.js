const path = require('path')

const webpackConfig = require('../../webpack.config.js')

webpackConfig.entry = __dirname
webpackConfig.output.path = path.join(__dirname, 'public')
webpackConfig.externals = []

module.exports = webpackConfig
