'use strict';
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const Bucket = 's3-bucket-products';
const params = {
  Bucket,
  Key: 'uploaded/',
  ContentType: 'text/cvs',
  Expires: 60,
};

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};

module.exports.importFileParser = async (event) => {
  console.log('New File was added!!');
  return {
    statusCode: 200,
    body: JSON.stringify({
      msg: 'Triggered!',
      event,
    }),
  };
};
