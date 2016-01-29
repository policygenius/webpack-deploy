var gulp = require('gulp');
var fs = require('fs');
var os = require('os');
var util = require('util');
var gutil = require('gulp-util');

var env = require('./utils').env;
var getRevision = require('./utils').getRevision;
var getConfigFor = require('./utils').getConfigFor;
var getRedisClient = require('./utils').getRedisClient;

//
// Deployment process tasks
//

function uploadFile(config, file, rev) {
  getRedisClient(config, function(client) {
    client.set(util.format(config.indexKey, rev), file);
    client.set(util.format(config.metaKey, rev), 'from ' + os.hostname() + ' on ' + new Date);
    client.end();
  });
}

function deployRedis(config, rev) {
  gutil.log(gutil.colors.yellow(env()), 'Uploading revision', gutil.colors.green(rev));

  if (config.files) {
    for (var i = 0, l = config.files.length; i < l; ++i) {
      var fileName = config.files[i].indexPath;
      gutil.log(gutil.colors.yellow(env()), 'Deploying', gutil.colors.magenta(fileName), '...');
      var file = fs.readFileSync(fileName, 'utf8');
      uploadFile(Object.assign({}, config, config.files[i]), file, rev);
    }
  } else {
    var file = fs.readFileSync(config.indexPath, 'utf8');
    uploadFile(config, file, rev);
  }
}

function printCurrentRev() {
  getRevision(function (rev) {
    gutil.log('Current revision', gutil.colors.green(rev));
  });
}

/**
 * Prints current revision number used as a redis key
 */
gulp.task('current-rev', [], printCurrentRev);


/**
 * Promotes specified revision as current
 */
gulp.task('deploy-redis', [], function() {
  getRevision(function (rev) {
    deployRedis(getConfigFor('redis'), rev);
  });
});

