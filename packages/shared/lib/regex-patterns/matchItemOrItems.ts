export const matchItemOrItems = (items: string[]) => {
   return items.length > 1
      ? items
           .map((item) => {
              return String.raw`\b${item}\b`;
           })
           .join("|")
           .replace("-", "\\-")
      : items[0];
};
