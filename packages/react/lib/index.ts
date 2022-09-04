import * as fs from "fs";
import * as path from "path";
import globby from "globby";

import { traversal } from "shared/lib";

const rootPath = process.argv[0];

((rootPath2: string) => {
   // grab config
   // validation for config - extensions
   // files to ignore
   // validation that first is a directory
   // then run algorithm to scan with checks within

   const rootPath = "../../../../Desktop/wage-app/wage/src";

   const resolveWithCwd = (pathToResolve: string) =>
      path.resolve(process.cwd(), pathToResolve);
   const rootPathResolved = resolveWithCwd(rootPath);

   const isDir = fs.statSync(rootPathResolved).isDirectory();

   if (!isDir) throw Error("Root path is not a directory.");

   const paths = globby.sync(rootPathResolved, {
      expandDirectories: {
         files: ["*.js", "*.tsx", "*.js"],
      },
   });

   const matches = traversal.matchFileContentsToPattern(paths, ["input"]);

   console.log(matches);
})(rootPath);
