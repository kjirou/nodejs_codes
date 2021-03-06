#!/usr/bin/env node

//
// aws-sdk:
//   http://docs.aws.amazon.com/AWSJavaScriptSDK/guide/node-intro.html
// Config:
//   http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Config.html
// S3 example:
//   http://docs.aws.amazon.com/AWSJavaScriptSDK/guide/node-examples.html
// S3 APIs:
//   http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html
//

var async = require('async');
var AWS = require('aws-sdk');

var awsConfig = require('./aws-config.json');


var s3 = new AWS.S3(awsConfig);

var uploadRoot = 'nodejs-codes/examples/aws-sdk/s3';

async.series([

  // バケット一覧取得
  function(next) {
    s3.listBuckets(function(err, data) {
      if (err) {
        return next(err);
      }
      console.log(data);
      next();
    });
  },

  // ファイル新規作成 or 上書き
  function(next) {
    var params = {
      Bucket: 'kjirou-sandbox',
      Key: uploadRoot + '/now.txt',
      Body: '!!' + (new Date()).toString() + '!!'
    };
    s3.upload(params, function(err, data) {
      if (err) {
        return next(err);
      }
      console.log(data);
      next();
    });
  },

  // ファイル読み出し
  function(next) {
    var params = {
      Bucket: 'kjirou-sandbox',
      Key: uploadRoot + '/now.txt'
    };
    s3.getObject(params, function(err, data) {
      if (err) {
        return next(err);
      }
      console.log(data);
      console.log(data.Body.toString());
      next();
    });
  }
], function(err) {
  if (err) {
    console.error(err);
    return;
  }
  console.log('Finish');
});
