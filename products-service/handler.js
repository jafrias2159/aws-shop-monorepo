'use strict';
const productList = require('./statics/productList.json');

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};

exports.getProductList = async (event) => {
  await sleep(500);
  const date = new Date();
  const timeStamp = date.toISOString();
  const productsWithtimeStamp = productList.map(function (product) {
    return { ...product, timeStamp };
  });
  const body = JSON.stringify({ products: productsWithtimeStamp });

  return {
    statusCode: 200,
    headers,
    body,
  };
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
