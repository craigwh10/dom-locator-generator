import {matchRequiredAttributes} from "../../lib/traversal";
import * as path from "path";

describe(matchRequiredAttributes.name, () => {
    it('should find testid in react example repo, with mixture of single quote and double quote surrounded testids', () => {
        const cwdPath = path.resolve(process.cwd(), '../../examples/example-react-app/src/App.js')
        const paths = [cwdPath];

        expect(matchRequiredAttributes(paths, ['data-testid'])).toEqual([
            {
                matches: ["data-testid='paragraph'", "data-testid='anchor'"], path: cwdPath
            }
        ])
    })
    // Todo: if data-testid={matcher}
    //  - find the flow of the prop
    //  - working up the dependencies till we get the raw components of it
    //  - then generate a function for that key.
})