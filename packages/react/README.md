# `react`

Generates a DOM Locator object by traversing from a designated root, such as `project/src`.

- Collect attributes of interest and values
- Generate functions if variable
- Generate strings if static

```ts
export const locators = {
    'App': {
       'input-App-0': "[data-testid='input']" 
    }
}
```

## Configuration

```js
export const config = {
    attributesToMatch: ['data-testid', 'placeholder'],
    namingConvention: ({element, file, index}) => {
        // input-App-0
        return `${element}-${file.split('.')[0]}-${index}`;
    },
    /*
     * Relative to root.
     */
    locationForFile: './assets/appLocators.js',
}
```

## `usage`

Using either yarn or npm.

```shell
   $ <npm/yarn> <add/i> @dlg/react
```