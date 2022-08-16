'use strict';
const AWS = require('aws-sdk');
const csv = require('csvtojson');

const s3 = new AWS.S3();

module.exports.importFileParser = async (event, context, callback) => {
  const Key = event.Records[0].s3.object.key;
  const Bucket = event.Records[0].s3.bucket.name;
  const sqs = new AWS.SQS();

  try {
    const stream = s3.getObject({ Bucket, Key }).createReadStream();
    // convert csv file (stream) to JSON format data
    const csvData = await csv().fromStream(stream);
    const products = await JSON.parse(JSON.stringify(csvData));
    products.forEach((product) => {
      sqs.sendMessage(
        {
          QueueUrl: process.env.SQS_URL,
          MessageBody: JSON.stringify(product)
        },
        function(err, data) {
          if (err) console.log(err, err.stack); // an error occurred
          else     console.log(data);           // successful response
        }
      );
    });

    callback(null, {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (err) {
    callback(Error(err));
  }
};
