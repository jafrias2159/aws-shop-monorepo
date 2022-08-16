'use strict';
const AWS = require('aws-sdk');
const csv = require('csvtojson');

const s3 = new AWS.S3();

module.exports.importFileParser = async (event) => {
  const Key = event.Records[0].s3.object.key;
  const Bucket = event.Records[0].s3.bucket.name;
  
  try {
    const stream = s3.getObject({ Bucket, Key }).createReadStream();
    // convert csv file (stream) to JSON format data
    const csvData = await csv().fromStream(stream);
    console.log(csvData);
    
  } catch (err) {
    console.log(err);
    callback(Error(err));
  }
};
