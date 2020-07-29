# Django minimal JS & css

Webpack config for Django with JS and CSS, simple as possible.

Inspired by [Pascal Widdershovens post](https://pascalw.me/blog/2020/04/19/webpack-django.html)
 
Features: 
- Hot reloading (HMR) of js components
- Development and production webpack configuration

## Usage
```bash
# create virtualenv and activate
python3 -m venv .venv
source .venv/bin/actiate

# install dependencies
pip install -r requirements.txt
npm install

# start devservers (kills both processes with ctrl-c)
python manage.py runserver & npm start && kill $!

# Dev server available on localhost:8080
```


## NPM Packages

Quite alot of stuff! Babel and vue packages are for compiling vue single file components.

| Package                 | Description                                    |
| ----------------------- | ---------------------------------------------- |
| clean-webpack-plugin    | Remove old transpiled bundles                  |
| css-loader              | Webpack CSS loader (js css imports etc)        |
| mini-css-extract-plugin | Extracts CSS from JS in separate files         |
| webpack                 | Webpack main package                           |
| webpack-cli             | Webpack CLI command tool                       |

## Python Packages
| Package               | Description                          |
| --------------------- | ------------------------------------ | 
| django                | Django framework                     |


## Known issues
- Outputs extra .js file for every scss file
