# Atila Web Components Library

A library of components used to build the Atila website

You can view the components at: https://bit.dev/atila/web-components-library

## Quickstart

This project can either be run as a React web server or a [Bit](https://bit.dev/) Server

To run as a React web server

- `yarn install`
- `yarn start`

To run as a Bit server

- `bit install`

## Adding a New Component

- Summary of this tutorial: [Getting Started with Bit](https://harmony-docs.bit.dev/getting-started/creating-components)

- Create a tsx folder and file for the component: `src/components/MyComponent/MyComponent.tsx`
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

### Export the New Component (or updating an existing component)

- Tag the component you changed: `bit tag <component_id> --patch --message "first version"`
    - Use `bit list` to find your component ID
- If you want to tag all modified components: `bit tag --all --message "add my component"`
    - Don't literally use my component, give it a descriptive message
- export: `bit export`
- commit your changes: `git commit -am "updated .bitmap file to new version"`
Go to https://bit.dev/atila/web-components-library to see your exported components.