'use strict';
import productList from './statics/productList.json';

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};

export const getProductList = async (event) => {
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

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
