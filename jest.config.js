module.exports = {
    roots: ['src'],
    setupFilesAfterEnv: ['<rootDir>/src/setupJest.ts', 'jest-canvas-mock'],
    moduleNameMapper: {
        '@core/(.*)': '<rootDir>/src/app/core/$1',
        '@shared/(.*)': '<rootDir>/src/app/shared/$1',
        '@environments/(.*)': '<rootDir>/src/environments/$1',
    },
};
