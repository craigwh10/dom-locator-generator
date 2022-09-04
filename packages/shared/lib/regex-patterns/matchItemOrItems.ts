/**
 * @example
 * ITEM
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
      : items[0];
};
