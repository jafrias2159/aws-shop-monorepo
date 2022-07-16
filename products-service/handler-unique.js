'use strict';
import productList from './statics/productList.json';

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};

const getProductById = async (event) => {
  const id = event.queryStringParameters.id;
  const selectedProduct = productList.find(function (product) {
    return id === product.id;
  });
  const [statusCode, product] =
    typeof selectedProduct === 'undefined'
      ? [404, 'Product not Found']
      : [200, selectedProduct];

  const body = JSON.stringify({
    product: product,
  });

  return {
    statusCode,
    headers,
    body,
  };
};

export { getProductById };
