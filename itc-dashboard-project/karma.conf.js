module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-edge-launcher'),                 // ← add this
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],

    client: {
      clearContext: false // keep Jasmine output visible in browser
    },

    coverageReporter: {
      dir: require('path').join(__dirname, 'coverage'),
      subdir: '.',
      reporters: [{ type: 'html' }, { type: 'text-summary' }]
    },

    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,

    // Define a headless Edge launcher
    customLaunchers: {
      EdgeHeadless: {
        base: 'Edge',
        flags: ['--headless', '--disable-gpu', '--no-sandbox', '--disable-dev-shm-usage']
      }
    },

    // Use your new launcher by default (or pass --browsers=EdgeHeadless)
    browsers: ['EdgeHeadless'],

    singleRun: false,
    restartOnFileChange: true,

    jasmineHtmlReporter: {
      suppressAll: true
    }
  });
};