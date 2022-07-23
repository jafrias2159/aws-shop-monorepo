'use strict';
import { client } from './DBConection';

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};

const getProductById = async (event) => {
  const id = event.queryStringParameters.id;
  const result = await client.query(getQueryString(id));

  const [statusCode, product] =
    result.rows.length === 0 ? [404, 'Product not Found'] : [200, result.rows[0]];

  const body = JSON.stringify({
    product: product,
  });

  return {
    statusCode,
    headers,
    body,
  };
};

const getQueryString = (id) => {
  return `SELECT products.*, stocks.product_count as count FROM products JOIN stocks 
ON products.id = stocks.product_id AND products.id = '${id}';`;
};

export { getProductById };
