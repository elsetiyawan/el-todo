import { Router } from "express";
import { validate } from "express-validation";
import TodoValidation from "../validations/TodoValidation";
import TodoController from "../controllers/TodoController";
import iRouter from "./RouterInterface";

class TodoRouter implements iRouter {
  public router: Router;
  constructor() {
    this.router = Router();
    this.routes();
  }
  routes(): void {
    this.router.get("/", TodoController.index);

    this.router.post(
      "/",
      validate(TodoValidation.createTodo, {}, { abortEarly: false }),
      TodoController.create
    );

    this.router.get("/:id", TodoController.show);

    this.router.put(
      "/:id",
      validate(TodoValidation.updateTodo, {}, { abortEarly: false }),
      TodoController.update
    );

    this.router.delete("/:id", TodoController.delete);
  }
}

export default new TodoRouter().router;
