import { NextFunction, Request, Response } from "express";
import APIError from "../helpers/APIError";

require("dotenv").config();

const Handler = (
  err: APIError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const response = {
    code: err.status,
    message: err.message,
    errors: err.errors,
    stack: err.stack,
  };
  if (process.env.NODE_ENV === "production") delete response.stack;
  return res.status(404).json(response);
};

const NotFound = (req: Request, res: Response, next: NextFunction) => {
  const err = new APIError({ message: "Page not found", status: 404 });
  return Handler(err, req, res, next);
};

export { NotFound, Handler, Handler as ErrorHandler };
