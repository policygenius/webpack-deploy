const path = require('path');
const gulp = require('gulp');
const rename = require('gulp-rename');
const google = require('@google-cloud/storage');
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

  // set-up client here...
  const gcs = google({
    projectId: config.credentials.projectId,
    keyFilename: config.credentials.keyFilename,
  });

  const bucketName = config.credentials.params.Bucket;
  const bucket = gcs.bucket(bucketName);

  gutil.log(`${gutil.colors.magenta(`gs://${bucketName} => uploading`)} from ${config.assetsPath}`);

  return (
    gulp
      .src(config.assetsPath)
      .pipe(
        rename(function(filepath) {
          gutil.log(`${gutil.colors.yellow(`org`)}`, filepath);

          filepath.dirname = path.join(config.dirname, filepath.dirname);

          gutil.log(`${gutil.colors.yellow(`new`)}`, filepath);
        }),
      )
      .pipe(function(filepath) {
        gutil.log(`${gutil.colors.yellow(`upload`)}`, filepath);
        // bucket.upload(
        //   filepath,
        //   {
        //     destination: `${filepath}`,
        //     public: true,
        //     gzip: true,
        //   },
        // )
        // .then(() => gutil.log(`${gutil.colors.dim('↑ Uploaded')} ${filepath}`));
      })
  );
};


/**
 * Deploy tasks
 */
gulp.task('deploy-gcloud', () => deployGcloud(getConfigFor('googleCloud')));
