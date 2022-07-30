'use strict';
import { client } from './db-connection';

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};

const getProductById = async (event) => {
  try {
    console.log(
      'Getting a unique product by id - on  GET /products/{id} endpoint'
    );
    const id = event.pathParameters.id;
    const query = getQueryString(id);
    const values = [id];
    const result = await client.query(query, values);

    const [statusCode, product] =
      result.rows.length === 0
        ? [404, 'Product not Found']
        : [200, result.rows[0]];

    const body = JSON.stringify({
      product: product,
    });

    return {
      statusCode,
      headers,
      body,
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: 'Server Error',
    };
  }
};

const getQueryString = () => {
  return `SELECT products.*, stocks.product_count as count FROM products JOIN stocks 
ON products.id = stocks.product_id AND products.id = $1;`;
};

export { getProductById };
