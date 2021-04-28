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
      // const tobePush = { ...req.body, id: v4() };
      // this.todos.push(tobePush);
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
      // const dataToShow = this.todos.find((todo: any) => todo.id === params.id);
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
      // const objIndex = this.todos.findIndex((obj: any) => obj.id === params.id);
      // this.todos[objIndex] = { ...body };
      const updateUser = await TodoService.updateSingleTodo(params.id, body);
      return res.status(201).json(updateUser);
    } catch (err) {
      console.log(err);
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
      // this.todos = this.todos.filter((obj: any) => obj.id !== params.id);
      const deleteData = await TodoService.deleteSingleTodo(params.id);
      return res.status(201).send(deleteData);
    } catch (err) {
      next(err);
    }
  };
}

export default new TodoController();
