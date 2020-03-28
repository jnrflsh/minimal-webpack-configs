# ES6 async/await

Transpilation of ES6 with async/await.

## Usage
```bash
npm install   # install dependencies
npm start     # dev server on localhost:8080
npm build     # build to dist/
```

## Packages
| Package                 | Description                                    |
| ----------------------- | ---------------------------------------------- |
| @babel/core             | Babel js transpilation core features           |
| @babel/plugin-transform-runtime | Prevents duplicate code from polyfills and helpers |
| @babel/preset-env       | Smart transpilation detection (what is needed) |
| @babel/runtime-corejs3  | Babel helpers,reg runtime and corejs polyfills |
| babel-loader            | Babel webpack loader for transpiling js        |
| webpack                 | Webpack main package                           |
| webpack-cli             | Webpack CLI command tool                       |
| webpack-dev-server      | Webpack local development server               |

