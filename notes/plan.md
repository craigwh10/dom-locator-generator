## Motivation

- DRY access patterns for getting elements for:
  - Regression-tests
  - Unit-tests
  - Integration-tests
  - E2E-tests

Inspired by refactoring of page-object models.

## Plan

> Current plan
- Get root path of project
- Set in config selectors of interest
- Search file tree and collect props/attrs of interest
- Generate object

>Rejected plan
- ~~Get DOM Object~~
    - ~~From document post-build~~
    - ~~Grab build dir~~
    - ~~Inject class and pass document into constructor~~~~
    - ~~Grab and use document to traverse.~~
- ~~Traverse tree~~
- ~~Get items-of-interest~~
- ~~Generate object of form:~~~

`> page1-locators.[ts,js,json]`
```ts
const page1Locators = {
    acceptButton: {
        'data-at-id': '',
        'data-testid': ''
    },
    nameInput: {
        'data-at-id': '',
        'data-testid': ''
    }
}
```

## Issues-in-mind

- Static routing
  - Application with many html files that are served.
  - SSR
- Dynamic routing
  - Application with 1 html file which is decorated via javascript.

Milestones will be shown on readme.md.

- [ ] Create an algorithm to get only data-testids for the files of interest with their paths
  - Still of type Paths.

