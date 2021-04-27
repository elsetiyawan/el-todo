import express, { Application, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.plugins();
    this.routes();
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
    this.app.route("/").get((req: Request, res: Response) => {
      return res.status(200).json({ message: "Hi there!" });
    });
    this.app.route("/").post((req: Request, res: Response) => {
      return res.status(200).json({ message: "Hi there!" });
    });
  }
}

const port: number = 8000;
const app = new App().app;
app.listen(port, () => {
  console.log("Server is up and running on port ", port);
});
