import { readFileSync } from "fs";

export const matchRequiredAttributes = (paths: string[], attrs: string[]) => paths.map((item) => {
    const res = readFileSync(item).toString();

    const regexp = attrs.length > 1 ? attrs.join('|') : attrs[0];

    // https://regex101.com/r/TiP1Y2/1
    // transformed to \b\w*data-testid\w*\b=["-'][^"]*["-']
    // v1 String.raw`\b\w*${regexp}\w*\b="(.*?)"`, 3 sep just "
    // v2 --
    //
    const attributes = new RegExp(
        String.raw`\b\w*${regexp}\w*\b=["-'][^"-']*["-']`,
        'ig'
    );

    const itemsOfInterest = [...res.matchAll(attributes)];
    return itemsOfInterest.length ?
            {
                path: item,
                matches: itemsOfInterest.map(
                    (item) => {
                        return item[0].replaceAll('\"', "'");
                    })
            }
        :
            {
                path: item,
                matches: null
            }
    })