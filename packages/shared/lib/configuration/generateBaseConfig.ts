import * as fs from "fs";
import * as path from "path";
import * as util from "util";

interface BaseConfigInputs {
   searchRoot: string;
   attributes: string[];
   locationForFile: string;
}

const baseConfig = (baseConfigInputs: BaseConfigInputs) => {
   const { searchRoot, attributes, locationForFile } = baseConfigInputs;

   return {
      searchRoot: searchRoot.length ? searchRoot : "./src",
      attributes: attributes[0] !== "" ? attributes : ["data-testid"],
      locationForFile: locationForFile.length
         ? locationForFile
         : "./testAssets/appLocators.js",
   };
};

export const generateBaseConfig = async (
   baseConfigInputs: BaseConfigInputs
) => {
   const pathAtCwd = path.resolve(process.cwd(), "./dlg.config.js");

   fs.writeFile(pathAtCwd, "module.exports =", { encoding: "utf-8" }, (err) => {
      if (err) {
         console.error("@dlg - error creating configuration.");
         console.error(err.message);

         return;
      }

      fs.appendFile(
         pathAtCwd,
         util.inspect(baseConfig(baseConfigInputs)),
         (err) => {
            if (err) {
               console.error("@dlg - error creating configuration content.");
               console.error(err.message);

               return;
            }

            console.log(
               "@dlg - successfully created dlg.config.js at",
               pathAtCwd
            );
         }
      );
   });
};
