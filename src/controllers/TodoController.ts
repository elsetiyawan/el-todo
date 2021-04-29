import { NextFunction, Request, Response } from "express";
import iController from "./ControllerInterface";
import { v4 } from "uuid";
import TodoService from "../services/TodoService";

class TodoController implements iController {
  public todos: any;
  constructor() {
    this.todos = [];
  }

  index = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    const allTodos = TodoService.getAllTodo();
    return res.status(200).json(allTodos);
  };

  create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const createTodo = await TodoService.createTodo(req.body);
      return res.status(201).json(createTodo);
    } catch (err) {
      next(err);
    }
  };

  show = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const { params } = req;
      const readUser = await TodoService.getSingleTodo(params.id);
      return res.status(200).json(readUser);
    } catch (err) {
      next(err);
    }
  };

  update = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const { params, body } = req;
      const updateUser = await TodoService.updateSingleTodo(params.id, body);
      return res.status(201).json(updateUser);
    } catch (err) {
      next(err);
    }
  };

  delete = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const { params } = req;
      const deleteData = await TodoService.deleteSingleTodo(params.id);
      return res.status(201).send(deleteData);
    } catch (err) {
      next(err);
    }
  };
}

export default new TodoController();
