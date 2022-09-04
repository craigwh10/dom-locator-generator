## Run

```sh
$ yarn
$ yarn test:all
```

## Vision of usage

<table>
<tr>
<th></th>
<th>with @dlg</th>
<th>without @dlg</th>
</tr>
<tr>
<td>Unit</td>
<td>
<pre lang="tsx">
// Input.test.tsx

import { Input } from "../../Input";
import { getLocators } from "@dlg/react";
import { render, fireEvent, container } from "@testing-library/react";

const elements = getLocators(Input, ["data-testid"], { scope: "component" });

describe(Input.name, () => {
   it("should call aFunction if type in input and click submit", () => {
      const spy = jest.spyOn(window, "alert");
      const element = render(<Input />);
      
      const input = container.getByTestId(elements["input-0"]);
      const button = container.getByTestId(elements["button-1"]);
      
      fireEvent.type(input, "hello");
      fireEvent.click(button);
      
      expect(input).toHaveTextContent("");
      expect(spy).toBeCalledWith("hello");
   });
   it("should not call aFunction if no input and click submit", () => {
      const spy = jest.spyOn(window, "alert");
      const element = render(<Input />);
      
      const button = container.getByTestId(elements["button1"]);
      
      fireEvent.click(button);
      
      expect(input).toHaveTextContent("");
      expect(spy).not.toBeCalledWith("hello"); 
   });
});

</pre>
</td>
<td>
<pre lang="tsx">
// Input.test.tsx

import { Input } from "../../Input";
import { render, fireEvent, container } from "@testing-library/react";

describe(Input.name, () => {
   it("should call aFunction if type in input and click submit", () => {
      const spy = jest.spyOn(window, "alert");
      const element = render(<Input />);
      
      const input = container.getByTestId("input");
      const button = container.getByTestId("button1");
      
      fireEvent.type(input, "hello");
      fireEvent.click(button);
      
      expect(input).toHaveTextContent("");
      expect(spy).toBeCalledWith("hello");
   });
   it("should not call aFunction if no input and click submit", () => {
      const spy = jest.spyOn(window, "alert");
      const element = render(<Input />);
      
      const button = container.getByTestId("button1");
      
      fireEvent.click(button);
      
      expect(input).toHaveTextContent("");
      expect(spy).not.toBeCalledWith("hello");
   });
});

</pre>
</td>
</tr>
<tr>
<td>Regression</td>
<td>
<pre lang="ts">
// PageObjects/Home.ts

import { getLocators } from "@dlg/react";

const elements = getLocators("../../../src/pages", ["data-testid"], {
   scope: "page",
});

export class HomePage {
   get Input(): Promise<Element> {
      return $(elements["input-0"].xPath);
   }
   get Button(): Promise<Element> {
      return $(elements["button-1"].xPath);
   }

   get ItemListOptions(): Promise<Element[]> {
      // could be $$(elements['list'].xPath.startWith())
      return $$(elements["list"].xPath.modify((item) => item.replace("=", "\*=")));
   }
}

</pre>
</td>
<td>
<pre lang="ts">
// PageObjects/Home.ts

export class HomePage {
   get Input(): Promise<Element> {
      return $('[data-testid="input"]');
   }
   get Button(): Promise<Element> {
      return $('[data-testid="button1"]');
   }
   get ItemListOptions(): Promise<Element[]> {
      return $$('[data-testid*="list"])');
   }
}
</pre>
</td>
</tr>
<tr>
<td></td>
<td>
<ul>
<li>1 source of truth</li>
<ul>
<li>Less replication of work</li>
<li>Automatically maintained</li>
</ul>
<li>Type checking on missing keys</li>
</ul>
</td>
<td>
<ul>
<li>Not reactive (only when test fails)</li>
<ul>
<li>Annoying to maintain</li>
<li>No type safety</li>
</ul>
<li>Multiple sources of truth</li>
<li>Less code</li>
<li>Easy to change individually</li>
</ul>
</td>
</tr>
</table>

## Milestones

-  [ ] Generate testId locator file for React. (MVP)
   -  Doing react as this is the framework I'm more familiar with.
-  [ ] Generate testId locator file for Vue/Svelte/Angular
   -  Wouldn't mind help

## Contributing

-  [Kanban Board](https://github.com/users/craigwh10/projects/2/views/1)
-  Ensure to read through relevant readmes
-  Comment on tickets if you require support
-  Raise issues on board for enhancements/bugs/requests.

### Onboarding

-  dependencies:
   -  https://github.com/terkelg/prompts
   -  https://lerna.js.org
   -  https://www.npmjs.com/package/globby
-  testing:
   -  https://jestjs.io/docs/getting-started
-  core stuff:
   -  https://nodejs.org/docs/latest-v17.x/api/
   -  https://www.typescriptlang.org
-  selectors (I'm generally aware of):
   -  https://enzymejs.github.io/enzyme/docs/api/selector.html
   -  https://testing-library.com/docs/queries/about/
   -  https://webdriver.io/docs/selectors/
   -  https://www.protractortest.org/#/locators
-  /notes/plan.md
-  regex:
   -  https://regex101.com
      -  ECMAScript flavour (note JS does not support features such as negative/pos lookahead/behind groups)
