import { readFileSync } from "fs";

export const matchRequiredAttributes = (
   paths: string[],
   attrs: string[]
): MatchedAttributes =>
   paths.map((item) => {
      const res = readFileSync(item).toString();

      const regexp = attrs.length > 1 ? attrs.join("|") : attrs[0];

      // https://regex101.com/r/TiP1Y2/1
      // transformed to \b\w*data-testid\w*\b=["-'][^"]*["-']
      // v1 String.raw`\b\w*${regexp}\w*\b="(.*?)"`, 3 sep just "
      // v2 \b\w*data-testid\w*\b=["'{][^"'{}]*["'}]
      // v3 \b\w*data-testid\w*\b=["'{]*[\S]*['}"]
      //    - * is repeating previous match till next group
      //    - [] is a set to match 1 character (can be repeated with *)
      //    - \S is any non space character
      const attributes = new RegExp(
         String.raw`\b\w*${regexp}\w*\b=["'{]*[\S]*['}"]`,
         "ig"
      );

      const itemsOfInterest = [...res.matchAll(attributes)];
      return itemsOfInterest.length
         ? {
              path: item,
              matches: itemsOfInterest.map((item) => {
                 return item[0]?.replaceAll('"', "'");
              }),
           }
         : {
              path: item,
              matches: null,
           };
   });

interface MatchedAttributeValues {
   path: string;
   matches: Array<string> | null;
}

export type MatchedAttributes = Array<MatchedAttributeValues>;
