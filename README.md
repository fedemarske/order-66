# List items

Sortable list that help you manages your items.

### Dependecies

* [Nodejs](https://nodejs.org/es/)
* NPM (installed along with nodejs)
* Gulp (install globally with npm install -g gulp)

## Getting Started

In the root of the folder, execute for production:

```
npm install --production
```

or for development

```
npm install
```

Then 

```
node index.js
```

The app should be availble on http://localhost:3000

## Documentation

This app consist in 3 components:

* List 
* Item
* Modal

And init.js is the entry point of the app which handles all the initialization of the app.

Third party libraries used in this app:

* Jquery
* Jquery-sortable (for drag and drop)
* Lockr (for localstorage manage)