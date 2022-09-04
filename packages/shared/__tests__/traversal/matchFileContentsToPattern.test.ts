import { matchFileContentsToPattern } from "../../lib/traversal";
import * as path from "path";

describe(matchFileContentsToPattern.name, () => {
   const cwdPath = path.resolve(
      process.cwd(),
      "../../examples/example-react-app/src/App.js"
   );
   const paths = [cwdPath];

   it("should find testid in react example repo, with mixture of single quote and double quote surrounded testids", () => {
      expect(matchFileContentsToPattern(paths, ["data-testid"])).toEqual([
         {
            matches: [
               "data-testid='paragraph'",
               "data-testid='anchor'",
               "data-testid='thisInput'",
            ],
            path: cwdPath,
         },
      ]);
   });

   it("should grab attributes wrapped in curly braces and get non testid attrs if passed in", () => {
      expect(matchFileContentsToPattern(paths, ["placeholder"])).toEqual([
         {
            matches: ["placeholder={'hello'}"],
            path: cwdPath,
         },
      ]);
   });

   it("should grab multiple attributes when placeholder and data-testid is passed in", () => {
      expect(
         matchFileContentsToPattern(paths, ["data-testid", "placeholder"])
      ).toEqual([
         {
            matches: [
               "data-testid='paragraph'",
               "data-testid='anchor'",
               "placeholder={'hello'}",
               "data-testid='thisInput'",
            ],
            path: cwdPath,
         },
      ]);
   });

   // Todo: if data-testid={matcher}
   //  - find the flow of the prop
   //  - working up the dependencies till we get the raw components of it
   //  - then generate a function for that key.
});
