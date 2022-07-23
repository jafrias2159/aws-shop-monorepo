'use strict';
import { client } from './DBConection';

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};

const createProduct = async (event) => {
  const { title, description, price } = JSON.parse(event.body);
  const query = 'INSERT INTO products(title, description, price) VALUES($1, $2, $3) RETURNING *'
  const values = [title, description, price]
  const result = await client.query(query, values);

  const body = JSON.stringify({
    product: result.rows[0],
  });

  return {
    statusCode: 200,
    headers,
    body,
  };
};

export { createProduct };
