var secrets = require('./secrets.js');

var s3Credential = {
  accessKeyId:     secrets.s3.accessKeyId,
  secretAccessKey: secrets.s3.secretAccessKey,
  params: {
    Bucket: 's3-assets'
  }
};

var googleCloudCredential = {
  projectId:   secrets.gcloud.projectId,
  keyFilename: secrets.gcloud.keyFilename,
  params: {
    Bucket: 'cloudstorage-assets'
  }
};

var config = {
  frontline: {
    url: 'https://example.com/frontline/deploy',
    authToken: secrets.frontline.authToken,
    indexPath: 'dist/index.html',
  },

  googleCloud: {
    // Let's stick with single Gcloud bucket for now
    development: {
      credentials: googleCloudCredential,
      dirname: '/development/assets',
      assetsPath: 'dist/assets/*',
    },
    staging: {
      credentials: googleCloudCredential,
      dirname: '/development/assets',
      assetsPath: 'dist/assets/*',
    },
    me: {
      credentials: googleCloudCredential,
      dirname: '/development/assets',
      assetsPath: 'dist/assets/*',
    },
    production: {
      credentials: googleCloudCredential,
      dirname: '/development/assets',
      assetsPath: 'dist/assets/*',
    }
  },

  s3: {
    // Let's stick with single S3 bucket for now
    development: {
      credentials: s3Credential,
      dirname: '/development/assets',
      assetsPath: 'dist/assets/*',
    },
    staging: {
      credentials: s3Credential,
      dirname: '/development/assets',
      assetsPath: 'dist/assets/*',
    },
    me: {
      credentials: s3Credential,
      dirname: '/development/assets',
      assetsPath: 'dist/assets/*',
    },
    production: {
      credentials: s3Credential,
      dirname: '/development/assets',
      assetsPath: 'dist/assets/*',
    }
  },

  slack: {
    staging: {
      url: 'https://staging.example.com',
      notifyWebHook: 'https://hooks.slack.com/services/XXXXYYYY/ZZZZUUUUU/asdjLJFHLFJKHLDJKFHDdfdh',
    },
    production: {
      url: 'https://www.example.com',
      notifyWebHook: 'https://hooks.slack.com/services/ZZZZYYYY/ZZZZTTTTT/asdjLJFHLFJKHLDJKFHDdfdh',
    },
  },

  git: {
    staging: {
      url: 'https://staging.example.com',
      remote: 'origin',
      abbrev: 7,
    }
  },

};

module.exports = config;
