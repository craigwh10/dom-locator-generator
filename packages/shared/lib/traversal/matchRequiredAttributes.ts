import { readFileSync } from "fs";

export const matchRequiredAttributes = (
   paths: string[],
   attrs: string[]
): MatchedAttributes =>
   paths.map((item) => {
      const res = readFileSync(item).toString();

      const regexp =
         attrs.length > 1
            ? attrs
                 .map((item) => {
                    return String.raw`\b${item}\b`;
                 })
                 .join("|")
                 .replace("-", "\\-")
            : attrs[0];

      // https://regex101.com/r/TiP1Y2/1
      // transformed to \b\w*data-testid\w*\b=["-'][^"]*["-']
      // v1 String.raw`\b\w*${regexp}\w*\b="(.*?)"`, 3 sep just "
      // v2 \b\w*data-testid\w*\b=["'{][^"'{}]*["'}]
      // v3 \b\w*data-testid\w*\b=["'{]*[\S]*['}"]
      //    - * is repeating previous match till next group
      //    - [] is a set to match 1 character (can be repeated with *)
      //    - \S is any non space character
      // v4 \b\w*(?:\bdata\-testid\b|\bplaceholder\b)\w*\b=["'{]*[\S]*['}"]
      //   - support for matching everything enclosed for multiple words
      //   - split into \b \b padded words so that it matches the full words
      //   - escaped -'s in word match so that it doesn't treat it as a range
      //   - conditionally set pattern.
      // action: test these regexes seperately against lots of possible variants.

      const pattern =
         attrs.length > 1
            ? String.raw`\b\w*(?:${regexp})\w*\b=["'{]*[\S]*['}"]`
            : String.raw`\b\w*${regexp}\w*\b=["'{]*[\S]*['}"]`;

      const attributes = new RegExp(pattern, "ig");

      const itemsOfInterest = [...res.matchAll(attributes)];

      // NOTE: Removed the itemOfInterest.length check here
      //       as if there is a matched pattern, then there
      //       is at least 1 element to be matched.
      return {
         path: item,
         matches: itemsOfInterest.map((item) => {
            return item[0].replaceAll('"', "'");
         }),
      };
   });

interface MatchedAttributeValues {
   path: string;
   matches: Array<string>;
}

export type MatchedAttributes = Array<MatchedAttributeValues>;
