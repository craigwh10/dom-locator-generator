import {matchRequiredAttributes} from "../../lib/traversal";
import * as path from "path";

describe(matchRequiredAttributes.name, () => {
    it('should find testid in react example repo', () => {
        const cwdPath = path.resolve(process.cwd(), '../../examples/example-react-app/src/App.js')
        const paths = [cwdPath];

        expect(matchRequiredAttributes(paths, ['data-testid'])).toEqual([
            {
                matches: ["data-testid='anchor'"], path: cwdPath
            }
        ])
    })
    // Need to consider edge case of single quoted vars.
})