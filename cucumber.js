module.exports = {
  default: {
    require: [
      'step-definitions/**/*.js',
      'support/world.js',
      'support/hooks.js'
    ],
    format: [
      'progress',
      'json:reports/report.json'
    ],
    publishQuiet: true,
    parallel: 1,
    timeout: 60000
  }
};