'use strict';

const client = require('./db-connection');
const AWS = require('aws-sdk');

module.exports.catalogsBatchProcess = async (event) => {
  const [product] = event.Records.map(({ body }) => body);
  const productInDB = await insertProduct(JSON.parse(product));
  const sns = new AWS.SNS({ region: 'us-east-1' });
  console.log('Product added to DB', productInDB);

  sns.publish(
    {
      Subject: 'A new product has been added to DB',
      Message: JSON.stringify(productInDB),
      TopicArn: process.env.SNS_ARN,
    },
    function (err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else console.log(data); // successful response
    }
  );
};

const insertProduct = async (requestBody) => {
  const { title, description, price, count } = requestBody;
  const query =
    'INSERT INTO products(title, description, price) VALUES($1, $2, $3) RETURNING *';
  const values = [title, description, price];
  const result = await client.query(query, values);

  const productId = result.rows[0].id;
  const stockQuery =
    'INSERT INTO stocks(product_id, product_count) VALUES($1, $2) RETURNING product_count';
  const valuesStock = [productId, count];
  const resultInStock = await client.query(stockQuery, valuesStock);
  const stockCount = resultInStock.rows[0].product_count;

  const body = JSON.stringify({
    product: { ...result.rows[0], count: stockCount },
  });

  return body;
};
