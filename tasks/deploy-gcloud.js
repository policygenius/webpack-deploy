const path = require('path');
const gulp = require('gulp');
const rename = require('gulp-rename');
const gcPub = require('gulp-gcloud-publish');
const gutil = require('gulp-util');

const { getConfigFor } = require('./utils.js');

/*
 * Deploy compiled, minified and fingerprinted assets to a Google Cloud Storage bucket.
 */
function deployGcloud(config) {
  if (!config.credentials.projectId || !config.credentials.keyFilename) {
    gutil.log(
      gutil.colors.red('Google Cloud credentials missing, skipping upload...'),
    );
    return;
  };

  const metadata = {
    cacheControl: 'max-age=315360000, no-transform, public',
  };

  gutil.log(`${gutil.colors.magenta(`gs://${config.credentials.params.Bucket} => uploading from`)} ${config.assetsPath}`);

  return (
    gulp
      .src(config.assetsPath)
      .pipe(
        gcPub({
          bucket: config.credentials.params.Bucket,
          keyFilename: config.credentials.keyFilename,
          projectId: config.credentials.projectId,
          base: config.dirname,
          public: true,
          metadata: metadata,
        }),
      )
  );
};


/**
 * Deploy tasks
 */
gulp.task('deploy-gcloud', () => deployGcloud(getConfigFor('googleCloud')));
