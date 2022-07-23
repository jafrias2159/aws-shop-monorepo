'use strict';
import { client } from './DBConnection';
import * as yup from 'yup';

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};

const createProduct = async (event) => {

  try {
    console.log('Creating a product - on  POST /products endpoint');
  
    const requestBody = JSON.parse(event.body);
    const validBodyRequest = await validateRequestBody(requestBody);
    
    if (validBodyRequest)   return insertProduct(requestBody);
  
    return {
      statusCode: 400,
      headers,
      body: 'Bad request, check you body data!',
    };

  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: "Server Error"
    };
  }

};

const validateRequestBody = async (requestBody) => {
  let schema = yup.object().shape({
    title: yup.string().required(),
    description: yup.string().required(),
    price: yup.number().required().positive().integer(),
  });
  return await schema.isValid(requestBody);
};


const insertProduct = async (requestBody) =>{
  const { title, description, price } = requestBody;
  const query =
    'INSERT INTO products(title, description, price) VALUES($1, $2, $3) RETURNING *';
  const values = [title, description, price];
  const result = await client.query(query, values);

  const body = JSON.stringify({
    product: result.rows[0],
  });

  return {
    statusCode: 200,
    headers,
    body,
  };
}

export { createProduct };
