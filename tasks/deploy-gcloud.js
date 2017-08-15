// const path = require('path');
const gulp = require('gulp');
// const aws = require('gulp-awspublish');
const gutil = require('gulp-util');

const { getConfigFor } = require('./utils.js');

function deployGcloud(config) {
  if (!config.credentials.projectId || !config.credentials.keyFilename) {
    gutil.log(
      gutil.colors.red('Google Cloud credentials missing, skipping upload...'),
    );
    return;
  };

  // set-up client here...

  return (
    gulp
      .src(config.assetsPath)
      .pipe(function(thing){
        console.log(thing);
      })
  );
};


/**
 * Deploy tasks
 */
gulp.task('deploy-s3', () => deployGcloud(getConfigFor('googleCloud')));
