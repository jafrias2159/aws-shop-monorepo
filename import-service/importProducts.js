'use strict';
const AWS = require('aws-sdk');
const s3 = new AWS.S3({ region: 'us-east-1', signatureVersion: 'v4' });

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

module.exports.importProductsFile = async (event) => {
  try {

    const fileName = event.queryStringParameters.name;
    const fileParams = { ...params, Key: params.Key + fileName };
    const fileUrl = s3.getSignedUrl('putObject', fileParams);

    return {
      statusCode: 200,
      headers,
      body: fileUrl,
    };
  } catch (error) {

    console.log(error);

    return {
      statusCode: 500,
      body: "Something went wrong!"
    };
  }
};
