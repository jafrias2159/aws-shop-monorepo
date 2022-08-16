'use strict';
const AWS = require('aws-sdk');
const s3 = new AWS.S3('us-east-1');

const Bucket = 's3-bucket-products';
const params = {
  Bucket,
  Prefix: 'uploaded/',
  Delimiter: '/',
};

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};

module.exports.getFileNames = async (event) => {
  const catalogs = await s3.listObjectsV2(params).promise();
  const files = catalogs.Contents.filter((files) => files.Size).map((file) => {
    return `https://${Bucket}.s3.amazonaws.com/${file.Key}`;
  });
  const body = JSON.stringify({
    files,
    input: event,
  }, null, 3);

  return {
    statusCode: 200,
    headers,
    body,
  };
};
