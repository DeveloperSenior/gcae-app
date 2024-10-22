/** Auto Generated 
 * @author Andres Felipe Escobar López
 * @date 2024
 * @copyright Tecnologico de Antioquia 2024
 */

module.exports = {
    verbose: true,
    collectCoverage: true,
    coverageReporters: ['text', 'html', 'lcov'],
    roots: ['<rootDir>/test/'],
    setupFiles: ["<rootDir>/test/setup-tests.js"],
    coverageDirectory: '<rootDir>/coverage',
    coverageThreshold: {
        "global": {
            "branches": 85,
            "functions": 85,
            "lines": 85,
            "statements": 85
        }
    },
    collectCoverageFrom: [
        "./src/**/*.js"
    ],
    reporters: ['default',
    ['jest-sonar', {
        outputDirectory: './.reports',
        outputName: 'testreport.xml'
    }],
    ['./node_modules/jest-junit', {
        outputDirectory: 'build/report/tests'
      }],
      ['./node_modules/jest-html-reporters', {
        publicPath: 'build/report/jest-report',
        pageTitle: '@APPNAME@ Jest Test Report'
      }]
]
};