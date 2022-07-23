'use strict';
import { client } from './db-connection';

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};

const sqlGetProductOnStock = `SELECT products.*, stocks.product_count as count FROM products JOIN stocks 
ON products.id = stocks.product_id;`;

export const getProductList = async (event) => {
  try {
    console.log('Getting all products on  GET /products endpoint');

    const result = await client.query(sqlGetProductOnStock);

    const body = JSON.stringify({ products: result.rows });

    return {
      statusCode: 200,
      headers,
      body,
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: "Server Error"
    };
  }
};
