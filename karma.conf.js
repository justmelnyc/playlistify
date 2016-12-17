module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      './tests/**/*.spec.*'
    ],
    exclude: [],
    preprocessors: {
      './tests/**/*.spec.*': ['webpack']
    },
    // webpack configuration
    webpack: require('./webpack.config.js'),
    webpackMiddleware: {
      stats: 'errors-only'
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    // logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeWithoutSecurity'],
    customLaunchers: {
      ChromeWithoutSecurity: {
        base: 'Chrome',
        flags: ['--disable-web-security']
      }
    },
    singleRun: false,
    concurrency: Infinity
  })
}
