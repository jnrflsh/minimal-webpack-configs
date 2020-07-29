# Django vue MPA (multi page app)

Django site with some interactive pages using vue single file components and SCSS support. Most Django+vue guides show how to create a SPA (single page app) and use Django rest framework – This is not that!This is a pretty complex setup, but made as simple as possible.

Features: 
- Hot reloading (HMR) of js components
- Vue ES6 + Single file components
- SCSS & SASS compilation
- webpack-dev-server proxies all non compiled requests to Django dev server, necessary to use HMR.
- Development and production webpack configuration

## Usage
```bash
# create virtualenv and activate
python3 -m venv .venv
source .venv/bin/actiate

# install dependencies
pip install -r requirements.txt
npm install

# start devservers
python manage.py runserver & npm start

# Dev server available on localhost:8080
```


## NPM Packages

Quite alot of stuff! Babel and vue packages are for compiling vue single file components. Webpack bundle tracker outputs a file used by Django webpack loader. Compiled bundles are saved as "main-[hash].js", and Django webpack loader gets the latest bundle name! Old bundles are removed by clean-webpack-plugin. 

| Package                 | Description                                    |
| ----------------------- | ---------------------------------------------- |
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
| webpack-bundle-tracker  | Write bundle info to file for used by Django webpack loader   |
| webpack-cli             | Webpack CLI command tool                       |

## Python Packages
| Package               | Description                          |
| --------------------- | ------------------------------------ | 
| django                | Django framework                     |
| django-webpack-loader | Loads webpack bundles via stats file | 

## Simplify this config
- django-webpack-loader, webpack-bundle-tracker and clean-webpack-plugin can be removed and output in webpack.config.js can be changed to `name.js` without hash. Files can be linked in django with regular `{% static 'static/bundles/main.js' %}`
- webpack-dev-server can be removed and `npm run watch` can be used instead. Reloading of JS in Django by refresh in browser.

## Known issues
- Outputs extra .js file for every scss file
