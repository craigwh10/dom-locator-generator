import { matchItemOrItems } from "./matchItemOrItems";

export const matchItemOrItemsAsAttributes = (items: string[]) => {
   const itemsOrItems = matchItemOrItems(items);

   return items.length > 1
      ? String.raw`\b\w*(?:${itemsOrItems})\w*\b=["'{]*[\S]*['}"]`
      : String.raw`\b\w*${itemsOrItems}\w*\b=["'{]*[\S]*['}"]`;
};

// NOTE:
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
