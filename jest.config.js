/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

import base from './jest.config.base';

export default {
    ...base,
    projects:
        [
            "<rootDir>/packages/*/jest.config.ts"
        ],
    coverageDirectory: "<rootDir>/coverage/"
};
