const gulp = require('gulp');
const fs = require('fs');
const gutil = require('gulp-util');
const revision = require('git-rev-promises');
const request = require('request-promise-native');

const argv = require('yargs')
  .options({
    env: {
      describe: 'Specify deploy environment',
      demandOption: false,
      type: 'string',
    },
    debug: {
      describe: 'Deploy to a frontline server in debug mode',
      demandOption: false,
      type: 'boolean',
    },
    branch: {
      describe: 'Override a deployment branch name',
      demandOption: false,
      type: 'string',
    },
  })
  .help().argv;

const {
  env,
  getConfigFor,
} = require('./utils');

//
// Deployment process tasks
//
async function deployFrontline(config, branch, rev) {
  const indexHtml = fs.readFileSync(config.indexPath, 'utf8');

  if (env() === 'development') branch = 'development';
  if (argv.branch) branch = argv.branch

  gutil.log(
    gutil.colors.blue(`[Frontline:${env()}]`),
    `${gutil.colors.dim('Deploying build:')} ${gutil.colors.yellow(branch)}(${rev})`,
  );

  const payload = {
    "name": `${branch}`,
    "revision": `${rev}`,
    "index_html": indexHtml,
  };

  try {
    await request.post({
      url: `${config.url}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'frontline-deployer',
        'Authorization': `bearer ${config.authToken}`
      },
      json: payload,
    });

    gutil.log(
      gutil.colors.blue(`[Frontline:${env()}]`),
      `Deploy Success! ${gutil.colors.green(branch)}(${rev})`,
    );

  } catch (e) {

    gutil.log(
      gutil.colors.blue(`[Frontline:${env()}]`),
      gutil.colors.red(`Failed to deploy ${branch}(${rev})`),
      argv.debug ? e : 'Use --debug to view errors.',
    );
  }
}

/**
 *  Deploys to a frontline-server
 */
gulp.task('deploy-frontline', async () => {
  const rev = await revision.short();
  const branch = await revision.branch();
  await deployFrontline(getConfigFor('frontline'), branch, rev);
});
