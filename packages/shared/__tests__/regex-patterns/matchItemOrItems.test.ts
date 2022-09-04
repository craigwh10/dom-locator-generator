import { matchItemOrItems } from "../../lib/regex-patterns";

describe(matchItemOrItems.name, () => {
   it("should generate appropriate regex for single item", () => {
      expect(matchItemOrItems(["ITEM"])).toEqual(String.raw`ITEM`);
   });
   it("should generate appropriate regex for multiple items", () => {
      expect(matchItemOrItems(["ITEM-1", "ITEM-2"])).toEqual(
         String.raw`\bITEM\-1\b|\bITEM\-2\b`
      );
   });
});

// NOTE:
// String.raw is syntactic sugar for double black slash in general strings on escape characters.
