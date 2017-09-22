# Webpack Frontline (a fork of webpack-deploy)
Collection of useful utilities for deploying (not only) webpack single-page apps
to a Frontline server.

## Frontline Deploys
When you use this script to deploy to a server that accepts frontline deploys.

![System Design](/frontline_deploy.png)


## Installation
```
cd $YOUR_PROJECT
npm install --save-dev webpack-frontline

# OR if you use yarn:

yarn add webpack-frontline --dev
```

## Configuration
Copy `deploy-config-example.js` and `secrets-example.js` into the root of your
project and fit them to your needs.
Also make sure you have `./node_modules/.bin` in your `$PATH`.

## Using with frontline
Build your Webpack project and run `deploy-frontline`.

`yarn deploy-frontline -- --help` to view available options.

By default, `deploy-frontline` will use the last git commit sha as its revision.
It will also use `development` as its default branch-name.

** Branches **
- `--env` is **NOT SET**, it will deploy to a branch named `development`.
- `--env` is set, it will use its current branch name.
- `--branch` is set,  it will use the passed in argument as the branch.

** Revisions **
- `--rev` is  **NOT SET**, it will use the current git revision sha as its revision id.
- `--rev` is set, it will use the passed in argument as its revision id.

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
