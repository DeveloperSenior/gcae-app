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
    reporters: ['default', ['jest-sonar', {
        outputDirectory: './.reports',
        outputName: 'testreport.xml'
    }]]
};