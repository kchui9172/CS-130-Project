# CS-130-Project

## Prerequisites

NodeJS and NPM

Running `node -v` and `npm -v` should return the versions of the respective programs.

## Setup

Running `npm install` will download all node package dependencies noted in `package.json`.

Note for developers: additional package dependencies should be installed with `npm install <package_name> --save`
so that the dependency is noted in in `package.json`.

## Running Rockmates

After all packages are installed, run `npm start`. The website can be viewed at `localhost:3000`.

## Documentation

Documentation is generated using YuiDoc. Documentation can be found in the `/public` directory. 

For developers: please try to add YuiDoc comments above added functions and classes.
In order to generate documentation, it is recommended that you globally install yuidoc:
`npm install -g yuidocjs`. After installing yuidoc, run: `yuidoc <path_to_js_source>
-o <path_to_output_dir>`

## Tests

Tests are run using Mocha with Chai. Test scripts can be found in the `/test` directory.
To run the test suite, simply use `npm test`. This command will search through the `/test`
directory and will recursively search and run the `.js` files in the directory.

Additional tests were created using Selenium, but have become outdated as the UI has changed
drastically and quickly. Stay tuned for those!

Known Bugs ::
-------------
* In some cases, webpack might throw a build-error like so : 
							    'ERROR in ./~/react-tap-event-plugin/src/injectTapEventPlugin.js
Module not found: Error: Cannot resolve module 'react/lib/EventPluginHub' in /mnt/selfBackup/CS-130-Project/node_modules/react-tap-event-plugin/src
 @ ./~/react-tap-event-plugin/src/injectTapEventPlugin.js 23:2-37'

We are still investigating the cause (and solution) for this bug. Stay tuned ~
