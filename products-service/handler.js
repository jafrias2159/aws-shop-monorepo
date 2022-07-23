'use strict';
import { client } from './DBConection';
import productList from './statics/productList.json';

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};

const sqlGetProductOnStock = `SELECT products.*, stocks.product_count as count FROM products JOIN stocks 
ON products.id = stocks.product_id;`;

export const getProductList = async (event) => {
  const result = await client.query(sqlGetProductOnStock);

  const body = JSON.stringify({ products: result.rows });

  return {
    statusCode: 200,
    headers,
    body,
  };
};

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
