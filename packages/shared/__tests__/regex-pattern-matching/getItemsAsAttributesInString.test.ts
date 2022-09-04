import { getItemsAsAttributesInString } from "../../lib/regex-pattern-matching";

const generateCase = (
   attributes: string[],
   searchString: string,
   expectedResult: string[],
   negativeResult: Array<string | null | undefined | number>
) => ({
   attributes,
   searchString,
   expectedResult,
   negativeResult,
});

const testSuite = {
   0: generateCase(
      ["data-testid"],
      "data-testid='hello' hello test data id",
      ["data-testid='hello'"],
      ["data", "id", "test", "hello", "data-testid", null]
   ),
   1: generateCase(
      ["placeholder"],
      "placeholder holdplace data-testid='testy' placeholder={'hi'}, placeholder='yo'",
      ["placeholder={'hi'}", "placeholder='yo'"],
      ["placeholder", "holdplace", "data-testid='testy'"]
   ),
   2: generateCase(
      ["class"],
      "class='px-8 col-lg-6' className={`egg-${idx}`}",
      ["class='px-8 col-lg-6'"],
      ["className={`egg-${idx}`}"]
   ),
   3: generateCase(
      ["className"],
      "class='px-8 col-lg-6' className={`egg-${idx}`}",
      ["className={`egg-${idx}`}"],
      ["class='px-8 col-lg-6'"]
   ),
};

type suiteIter = typeof testSuite[0];

const generateTestCases = (): Array<suiteIter> => {
   return Object.values(testSuite).map((item) => item);
};

describe(getItemsAsAttributesInString.name, () => {
   describe.each(generateTestCases())(
      "when passed in attributes and a search string",
      ({
         attributes,
         searchString,
         expectedResult,
         negativeResult,
      }: suiteIter) => {
         it(`should parse ${searchString} into expected attributes`, () => {
            expect(
               getItemsAsAttributesInString(attributes, searchString)
            ).toEqual(expectedResult);
         });
         it("should not contain any unknown attributes", () => {
            expect(
               getItemsAsAttributesInString(attributes, searchString)
            ).not.toContain(negativeResult);
         });
      }
   );
});
