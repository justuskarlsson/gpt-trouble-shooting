import 'dotenv/config';
import 'express-async-errors';

import express from 'express';
import {errorHandler} from './error'

export const api = express.Router(); // Create a separate router for the API routes
api.use(express.json());



api.get('/chat', async (req, res) => {
  res.status(200).json(["Hello!!"])
})


api.use(errorHandler);