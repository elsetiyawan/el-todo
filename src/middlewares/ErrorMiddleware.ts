import e, { NextFunction, Request, Response } from "express";
import { ValidationError } from "express-validation";
import APIError from "../helpers/APIError";

require("dotenv").config();

const Handler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const response = {
    code: err.status,
    message: err.message,
    errors: err.errors,
    stack: err.stack,
  };
  if (process.env.NODE_ENV?.trim() === "production") delete response.stack;
  return res.status(err.status).json(response);
};

const NotFound = (req: Request, res: Response, next: NextFunction) => {
  const err = new APIError({ message: "Page not found", status: 404 });
  return Handler(err, req, res, next);
};

const ConvertError = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let ConvertedError = err;
  let errors: any = [];
  let error: any;
  if (err instanceof ValidationError) {
    if (err.details.body) {
      error = err.details.body.map((obj) => ({
        path: "body",
        message: obj.message,
      }));
      errors = [...errors, ...error];
    }
    if (err.details.query) {
      error = err.details.query.map((obj) => ({
        path: "query",
        message: obj.message,
      }));
      errors = [...errors, ...error];
    }

    if (err.details.params) {
      error = err.details.params.map((obj) => ({
        path: "params",
        message: obj.message,
      }));
      errors = [...errors, ...error];
    }

    ConvertedError = new APIError({
      message: err.message,
      status: err.statusCode || 400,
      errors,
    });
  } else if (!(err instanceof APIError)) {
    ConvertedError = new APIError({
      message: err.message,
      status: err.status,
    });
  }
  // console.log(err instanceof APIError);
  return Handler(ConvertedError, req, res, next);
};

export { NotFound, Handler, Handler as ErrorHandler, ConvertError };
