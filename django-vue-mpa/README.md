# Django MPA Vue + SCSS

Django + vue webpack setup as simple as possible, supports older browsers with newer es6 features like async/await etc. If you don't need this, you can go for the even more minimal version prefixed 'no-ie'.

Inspired by [Pascal Widdershovens post](https://pascalw.me/blog/2020/04/19/webpack-django.html)
 
Features: 
- Vue single file components
- Hot reloading (HMR) of js components
- SCSS & SASS compilation
- Development and production webpack configuration

## Usage
```bash
# create virtualenv and activate
python3 -m venv .venv
source .venv/bin/actiate

# install dependencies
pip install -r requirements.txt
npm install

# start devserver on localhost:8000 (kills both processes with ctrl-c)
python manage.py runserver & npm start && kill $!
```


## NPM Packages

Quite alot of stuff! Babel and vue packages are for compiling vue single file components.

| Package                 | Description                                    |
| ----------------------- | --------------------------------------------- |
| @babel/core             | Babel js transpilation core features           |
| @babel/preset-env       | Smart transpilation detection (what is needed) |
| babel-loader            | Babel webpack loader for transpiling js        |
| @babel/runtime-corejs3  | Babel helpers,reg runtime and corejs polyfills |
| @babel/plugin-transform-runtime | Prevents duplicate code from polyfills and helpers |
| clean-webpack-plugin    | Remove old transpiled bundles                  |
| css-loader              | Webpack CSS loader (js css imports etc)        |
| mini-css-extract-plugin | Extracts CSS from JS in separate files         |
| sass                    | sass support                                   |
| sass-loader             | Webpack SCSS loader                            |
| vue                     | vue framework                                  |
| vue-loader              | Webpack Vue loader                             |
| vue-template-compiler   | Webpack vue templates to js compiler           |
| webpack                 | Webpack main package                           |
| webpack-cli             | Webpack CLI command tool                       |

## Python Packages
| Package               | Description                          |
| --------------------- | ------------------------------------ | 
| django                | Django framework                     |


## Known issues
- Outputs extra .js file for every scss file
