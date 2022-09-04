import { matchItemOrItemsAsAttributes } from "../regex-patterns";

export const getItemsAsAttributesInString = (
   attrs: string[],
   searchString: string
) => {
   const pattern = matchItemOrItemsAsAttributes(attrs);

   const attributes = new RegExp(pattern, "ig");

   return [...searchString.matchAll(attributes)].map((item) => {
      return item[0].replaceAll('"', "'");
   });
};

// NOTE: Removed the itemOfInterest.length check here
//       as if there is a matched pattern, then there
//       is at least 1 element to be matched.
