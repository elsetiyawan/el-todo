import express, { Application, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import TodoController from "./controllers/TodoController";
import dotenv from "dotenv";
import { ErrorHandler, NotFound } from "./middlewares/ErrorMiddleware";
import TodoRouter from "./routes/TodoRouter";

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.plugins();
    this.routes();
    this.errorHandling();
    dotenv.config();
  }

  protected plugins(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(morgan("dev"));
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(compression());
  }

  protected routes(): void {
    this.app.use("/todos", TodoRouter);
  }

  protected errorHandling(): void {
    this.app.use(NotFound);
    this.app.use(ErrorHandler);
  }
}

export default new App().app;

