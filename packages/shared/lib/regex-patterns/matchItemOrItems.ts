/**
 * @note
 * \b \b is a word boundary, where you want
 * to capture words rather than just characters or via repeaters (x*)
 * @example
 * \bITEM\b
 * @example
 * \bITEM\-1\b|\bITEM\-2\b
 */
export const matchItemOrItems = (items: string[]) => {
   return items.length > 1
      ? items
           .map((item) => {
              return String.raw`\b${item}\b`;
           })
           .join("|")
           .replaceAll("-", "\\-")
      : String.raw`\b${items[0]}\b`;
};
