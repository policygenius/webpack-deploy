const path = require('path');
const gulp = require('gulp');
const rename = require('gulp-rename');
const aws = require('gulp-awspublish');
const gutil = require('gulp-util');
const tap = require('gulp-tap')

const { getConfigFor } = require('./utils.js');

/*
 * Deploy compiled, minified and fingerprinted assets to Amazon
 * S3.
 */
function deployS3(config) {
  if (!config.credentials.accessKeyId || !config.credentials.secretAccessKey) {
    gutil.log(
      gutil.colors.red('AWS S3 credentials missing, skipping upload...'),
    );
    return;
  }

  // create a new publisher
  const publisher = aws.create(config.credentials);

  // define custom headers
  function headers(fileName) {
    const cacheSetting = 'max-age=315360000, no-transform, public';

    if (fileName === 'manifest.json' || fileName === 'index.html') {
      cacheSetting = 'no-cache';
    }

    gutil.log("cache-control:", fileName, cacheSetting);

    return {
      'Cache-Control': cacheSetting,
    };
  }

  return (
    gulp
      .src(config.assetsPath)
      .pipe(
        rename(function(filepath) {
          filepath.dirname = path.join(config.dirname, filepath.dirname);
        }),
      )
      // gzip, Set Content-Encoding headers and add .gz extension
      .pipe(aws.gzip())
      // publisher will add Content-Length, Content-Type and headers specified above
      // If not specified it will set x-amz-acl to public-read by default
      .pipe(
        tap(function(file) {
          publisher.publish(headers(file.basename))
        }),
      )
      // create a cache file to speed up consecutive uploads
      .pipe(publisher.cache())
      // print upload updates to console
      .pipe(aws.reporter())
  );
}

/**
 * Deploy tasks
 */
gulp.task('deploy-s3', () => deployS3(getConfigFor('s3')));
