import type express from 'express'

export class HttpError extends Error {
  statusCode: number;
  constructor(statusCode: number, message: string){
    super(message);
    this.statusCode = statusCode;
  }
}

export class BadRequest extends HttpError {
  constructor(message: string) {
    super(400, message);
  }
}

export class Unauthorized extends HttpError {
  constructor(message: string) {
    super(401, message);
  }
}

export class InternalServerError extends HttpError {
  constructor(message: string) {
    super(500, message);
  }
}

export function errorHandler (err: Error, req: express.Request, res: express.Response, next: express.NextFunction)  {
  if (err instanceof HttpError) {
    res.status(err.statusCode).json({
      message: err.message,
    });
    console.error(err);
  } else {
    res.status(500).json({
      message: err.message,
    });
    console.error("UNHANDLED ERROR:");
    console.error(err);
  }
}

export function errorHandlerProd (err: Error, req: express.Request, res: express.Response, next: express.NextFunction)  {
  if (err instanceof HttpError) {
    res.status(err.statusCode).json({
      message: err.message,
    });
    console.error(err);
  } else {
    next(err);
  }
}
