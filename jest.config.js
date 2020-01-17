module.exports = {
    preset: 'jest-preset-angular',
    roots: ['src'],
    setupFilesAfterEnv: ['jest-canvas-mock'],
    moduleNameMapper: {
        '@core/(.*)': '<rootDir>/src/app/core/$1',
        '@share/(.*)': '<rootDir>/src/app/share/$1',
        '@environments/(.*)': '<rootDir>/src/environments/$1',
    },
};
