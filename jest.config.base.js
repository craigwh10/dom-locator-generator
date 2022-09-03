/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
    roots: [
        "<rootDir>/lib",
        "<rootDir>/__tests__"
    ],
    transform: {
        "^.+\\.ts$": "ts-jest",
        "^.+\\.(js|jsx)$": "babel-jest",
    },
    testRegex: "(__tests__/.*.(test|spec)).(js?|ts?)$",
    moduleFileExtensions: [
        "ts",
        "tsx",
        "js",
        "jsx",
        "json",
        "node"
    ],
    collectCoverage: true,
    coveragePathIgnorePatterns: [
        "(tests/.*.mock).(js?|ts?)$",
    ],
    verbose: true,
    // rootDir: './../../',

    // clearMocks: true,
    //
    // // Indicates whether the coverage information should be collected while executing the test
    //
    //
    //
    runner: "jest-runner",
    //
    // preset: 'ts-jest',
};
