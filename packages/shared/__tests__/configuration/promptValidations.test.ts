import { promptValidations } from "../../lib/configuration";

import * as fs from "fs";
import { resolve } from "path";
import { mocked } from "jest-mock";

jest.mock("fs");
jest.mock("path");

const mockFs = mocked(fs);
const mockResolve = mocked(resolve);

describe("promptValidations object", () => {
   describe(promptValidations.isDir.name, () => {
      beforeEach(() => {
         jest.resetAllMocks();
         jest.clearAllMocks();
      });

      it("should return true if path is a directory", () => {
         mockResolve.mockReturnValue("./mockCwdPath");
         mockFs.statSync.mockImplementation(() => {
            return {
               isDirectory: jest.fn().mockReturnValue(true),
            } as any;
         });

         expect(promptValidations.isDir("./mockCwdPath")).toEqual(true);
      });

      it("should return validation error that it is not a directory if it is not", () => {
         mockResolve.mockReturnValue("./mockCwdPath");
         mockFs.statSync.mockImplementation(() => {
            throw Error();
         });

         expect(promptValidations.isDir("./nonDirMockCwdPath")).toEqual(
            "./mockCwdPath is not a directory."
         );
      });
   });
});
