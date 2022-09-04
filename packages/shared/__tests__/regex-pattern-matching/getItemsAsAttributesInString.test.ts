import { getItemsAsAttributesInString } from "../../lib/regex-pattern-matching";

const testSuite = {
   0: {
      attributes: ["data-testid"],
      searchString: "data-testid='hello' hello test data id",
      expectedResult: ["data-testid='hello'"],
      negativeResult: ["data", "id", "test", "hello", "data-testid", null],
   },
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
