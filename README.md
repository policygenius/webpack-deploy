# Webpack Frontline (a fork of webpack-deploy)
Collection of useful utilities for deploying (not only) webpack single-page apps
to a Frontline server.

## Installation
```
cd $YOUR_PROJECT
npm install --save-dev webpack-frontline
````

## Configuration
Copy `deploy-config-example.js` and `secrets-example.js` into the root of your
project and fit them to your needs.
Also make sure you have `./node_modules/.bin` in your `$PATH`.

## Use
Build your Webpack project and run `deploy-frontline`.

## Commands
- `deploy-frontline`
Frontline server upload of built index.html
- `deploy-s3`
AWS S3 asset upload of build files.
- `deploy-gcloud`
Google Clould Storage asset upload of build files.

## Other

### Why Bash with Gulp?
Gulp is great for building, Bash for running tasks.

## TODO
- init: config copy
- slack integration
- github PR deploy notification: https://developer.github.com/changes/2014-01-09-preview-the-new-deployments-api/
- optional deploy message (for slack)
- list commits in slack message
- notification center updates
- friendlier error messages "Did you forget to ...?"
- abstract slack notifs into utils

## License
MIT

## Prettier config
```
{
  // Autoformat files on save
  "autoformat": true,

  // Only attempt to format files with extensions set there
  "extensions": ["js"],

  // Fit code within this line limit
  "printWidth": 80,

  // Number of spaces it should use per tab
  "tabWidth": 2,

  // If true, will use single instead of double quotes
  "singleQuote": true,

  // Controls the printing of trailing commas wherever possible
  "trailingComma": "all",

  // Controls the printing of spaces inside array and objects
  "bracketSpacing": true
}
```
