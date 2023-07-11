import 'dotenv/config';
import 'express-async-errors';

import express from 'express';
import {errorHandler} from './error'
import { openai } from 'config';
import { CreateChatCompletionRequest } from 'openai';

export const api = express.Router(); // Create a separate router for the API routes
api.use(express.json());



api.get('/test', async (req, res) => {
  res.status(200).json(["Hello!!"])
})

api.post('/chat', async (req, res) => {
  const body = req.body as CreateChatCompletionRequest
  const apiResponse = await openai.createChatCompletion(
    {
      ...body,
      stream: true
    },
    { responseType: "stream" }
  ) as any;

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  let connectionClosed = false;

  apiResponse.data.on('data', (data) => {
    if (data.toString() === '[DONE]') {
      if (!connectionClosed) {
        res.end();
        connectionClosed = true;
      }
    } else {
      res.write(data);
    }
  });

  apiResponse.data.on('end', () => {
    if (!connectionClosed) {
      res.end();
      connectionClosed = true;
    }
  });

  apiResponse.data.on('error', (err) => {
    console.error(err);
    if (!connectionClosed) {
      res.status(500).end();
      connectionClosed = true;
    }
  });
})


api.use(errorHandler);