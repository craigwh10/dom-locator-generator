import { generateBaseConfig } from "../../lib/configuration";

/**Mocking*/
import * as path from "path";
import * as util from "util";
import * as fs from "fs";
import {mocked} from "jest-mock";

const fsMock = mocked(fs);
const utilMock = mocked(util);
const pathMock = mocked(path);

jest.mock('fs');
jest.mock('util');
jest.mock('path');

console.error = jest.fn();
console.log = jest.fn();

/**End Mocking*/

describe(generateBaseConfig.name, () => {
    const promptResult = {
        searchRoot: "src",
        attributes: ["data-testid"],
        locationForFile: "src",
    };
    const baseConfig = '{searchRoot: "src", attributes: ["data-testid"], locationForFile: "src"}';

    beforeEach(() => {
        jest.resetAllMocks();
        jest.clearAllMocks();
    })

    it('should generate configuration from passed parameters if no errors',  async () => {
        pathMock.resolve.mockReturnValue('./mockPath');

        utilMock.inspect.mockReturnValue(
            baseConfig
        );

        jest.spyOn(fs, 'writeFile').mockImplementation((path, data, options, cb) => {
            return cb(null); // No error.
        })
        jest.spyOn(fs, 'appendFile').mockImplementation((path, baseConfig, cb) => {
            return cb(null); // No error
        })

        await generateBaseConfig(promptResult);

        expect(pathMock.resolve).toBeCalledWith(
            expect.anything(),
            './dlg.config.js'
        );

        expect(fsMock.writeFile).toBeCalledWith(
            './mockPath',
            'module.exports =',
            {encoding: "utf-8"},
            expect.anything()
        )

        expect(fsMock.appendFile).toBeCalledWith(
            './mockPath',
            baseConfig,
            expect.anything()
        )

        expect(console.error).toHaveBeenCalledTimes(0);

        expect(console.log).toHaveBeenCalledWith(
            "@dlg - successfully created dlg.config.js at",
            './mockPath'
        )
    })

    it('should not generate configuration if errors on writing file', async () => {
        pathMock.resolve.mockReturnValue('./mockPath');
        const error = new Error('writeFile error');

        utilMock.inspect.mockReturnValue(
            baseConfig
        );

        jest.spyOn(fs, 'writeFile').mockImplementation((path, data, options, cb) => {
            return cb(error); // No error.
        })

        await generateBaseConfig(promptResult);

        expect(console.error).toHaveBeenNthCalledWith(
            1,
            "@dlg - error creating configuration.",
        )

        expect(console.error).toHaveBeenNthCalledWith(
            2,
            error.message
        )
    })

    it('should not generate configuration if errors appending with baseConfig', async () => {
        pathMock.resolve.mockReturnValue('./mockPath');
        const error = new Error('appendFile error');

        utilMock.inspect.mockReturnValue(
            baseConfig
        );

        jest.spyOn(fs, 'writeFile').mockImplementation((path, data, options, cb) => {
            return cb(null); // No error.
        })

        jest.spyOn(fs, 'appendFile').mockImplementation((path, data, cb) => {
            return cb(error); // No error.
        })

        await generateBaseConfig(promptResult);

        expect(console.error).toHaveBeenNthCalledWith(
            1,
            "@dlg - error creating configuration content.",
        )

        expect(console.error).toHaveBeenNthCalledWith(
            2,
            error.message
        )
    })
});
