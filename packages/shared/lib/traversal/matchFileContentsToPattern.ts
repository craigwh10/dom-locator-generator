import { readFileSync } from "fs";
import { getItemsAsAttributesInString } from "../regex-pattern-matching";

export const matchFileContentsToPattern = (
   paths: string[],
   attrs: string[]
): MatchedAttributes =>
   paths.map((item) => {
      const res = readFileSync(item).toString();

      return {
         path: item,
         matches: getItemsAsAttributesInString(attrs, res),
      };
   });

interface MatchedAttributeValues {
   path: string;
   matches: Array<string>;
}

export type MatchedAttributes = Array<MatchedAttributeValues>;
