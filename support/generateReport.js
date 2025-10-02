const report = require('multiple-cucumber-html-reporter');

report.generate({
  jsonDir: 'reports',
  reportPath: 'reports/html-report',
  metadata: {
    browser: {
      name: 'chrome',
      version: 'latest'
    },
    device: "Enes's MacBook Air",
    platform: {
      name: 'macOS'
    }
  },
  customData: {
    title: 'Test Run Info',
    data: [
      { label: 'Project', value: 'NinjaOne Login Automation' },
      { label: 'Author', value: 'Enes Turan' },
      { label: 'Date', value: new Date().toLocaleString() }
    ]
  }
});