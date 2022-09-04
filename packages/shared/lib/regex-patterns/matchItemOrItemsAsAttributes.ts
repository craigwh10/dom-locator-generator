import { matchItemOrItems } from "./matchItemOrItems";

/**
 * @example
 * data-testid={''}
 * data-testid={'a b'}
 * data-testid={`item-${index}`}
 * placeholder="your name"
 * id='#header'
 * data-testid={"a"}
 */
export const matchItemOrItemsAsAttributes = (items: string[]) => {
   const itemsOrItems = matchItemOrItems(items);

   // order of OR |'s are sequential LTR so compound ones are priority.
   const stringBeyondEquals = String.raw`["'{\`]*.*?(?:'}|"}|\`}|\`|'|")`;

   return items.length > 1
      ? String.raw`\b\w*(?:${itemsOrItems})\w*\b=${stringBeyondEquals}`
      : String.raw`\b\w*${itemsOrItems}\w*\b=${stringBeyondEquals}`;
};

/* NOTE:
 https://regex101.com/r/TiP1Y2/1
 transformed to \b\w*data-testid\w*\b=["-'][^"]*["-']
// v1 String.raw`\b\w*${regexp}\w*\b="(.*?)"`, 3 sep just "

// v2 \b\w*data-testid\w*\b=["'{][^"'{}]*["'}]

// v3 \b\w*data-testid\w*\b=["'{]*[\S]*['}"]
    - * is repeating previous match till next group
    - [] is a set to match 1 character (can be repeated with *)
    - \S is any non space character

// v4 \b\w*(?:\bdata\-testid\b|\bplaceholder\b)\w*\b=["'{]*[\S]*['}"]
   - support for matching everything enclosed for multiple words
   - split into \b \b padded words so that it matches the full words
   - escaped -'s in word match so that it doesn't treat it as a range
   - conditionally set pattern.
 action: test these regexes seperately against lots of possible variants.

// V5 (Post test) - spaced attributes {'a b'} 'a b c'

v5 \b\w*(?:\bdata\-testid\b|\bplaceholder\b)\w*\b=["'{]*.*?['}"]
 - .*? https://stackoverflow.com/a/36519867 to capture every character
 next problem is that it doesn't capture a final } as it isn't repeating characters up to final
 solution
V5 Final \b\w*(?:\bdata\-testid\b|\bplaceholder\b)\w*\b=["'{`]*.*?(?:'}|"}|`}|`|'|")
 changed beyond =
 - (?: capture all
 - that is ', ", '}, "}), `, `} as the boundary [note back ticks are added here too for variable attrs]
 */

// Coverage of this is covered by implementation via getItemsAsAttributes, worth keeping un unit-tested for
// adaptability in the future and reduction of work.
