# Atila Web Components Library

A library of components used to build the Atila website

You can view the components at: https://bit.dev/atila/web-components-library

For an example of what we're trying to build, see [ethereum-boilerplate/ethereum-boilerplate](https://github.com/ethereum-boilerplate/ethereum-boilerplate)

## Quickstart

This project can either be run as a React web server or a [Bit](https://bit.dev/) Server

To run as a React web server

- `yarn install`
- `yarn start`

To run as a Bit server

- `bit install`

## Using in Other Projects

- Configure `@atila` as a scoped repository: `npm config set '@atila:registry' https://node.bit.dev`
- Install component: For example, `npm i @atila/web-components-library.ui.crypto-payment-form`

![Example of using web-components-library](https://i.imgur.com/cusLOEK.png)

## Testing

`yarn test`

To test a specific file: `yarn test SomeTestFileToRun`, for example  `yarn test Currency`

## Adding a New Component

- Summary of this tutorial: [Getting Started with Bit](https://harmony-docs.bit.dev/getting-started/creating-components)

- Create a tsx folder and file for the component: `src/components/MyComponent/MyComponent.tsx` or `src/components/MyComponent/index.tsx`
    - If you want to use your component in other components in the project, you might have to create a seperate file called `index.ts` that exports the components created in `MyComponent.tsx`
        - For example, see: `src/components/AddOrSwitchBlockchain/index.ts` and `src/components/AddOrSwitchBlockchain/AddOrSwitchBlockchain.tsx`
- Create a compositions file `src/components/MyComponent/MyComponent.compositions.tsx`
- Make sure to import stylesheets into the compostions file
    - Note: We're looking into a way to automatically import the stylesheets in all compositions

        ```
        import 'bootstrap/dist/css/bootstrap.css';
        import 'antd/dist/antd.css';
        ```
- Add using Bit: `bit add src/components/MyComponent/ --namespace ui`

- To remove: `bit remove ui/my-component`

### Running the dev server with new component

- `bit compile`
- `bit start`

## Troubleshooting
- If you're having issues with importing components in other components, try: `bit link` to 
link your `node_modules` with your workspace

### Export the New Component (or updating an existing component)

- `bit status` to see what changes have been made
- Tag the component you changed: `bit tag <component_id> --patch --message "first version"`
    - Use `bit list` to find your component ID
    - Example: `bit tag atila.web-components-library/ui/crypto-payment-form --patch --message "added support for binance and testnets"`
- If you want to tag all modified components: `bit tag --all --message "add my component"`
    - Don't literally use my component, give it a descriptive message
- export: `bit export`
- commit your changes: `git commit -am "updated .bitmap file to new version"`
Go to https://bit.dev/atila/web-components-library to see your exported components.