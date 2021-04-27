import { NextFunction, Request, Response } from "express";
import iController from "./ControllerInterface";
import { v4 } from "uuid";
import TodoService from "../services/TodoService";
import APIError from "../helpers/APIError";

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
    return res.status(200).json(this.todos);
  };

  create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const tobePush = { ...req.body, id: v4() };
      this.todos.push(tobePush);
      return res.status(201).json(tobePush);
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
      const dataToShow = this.todos.find((todo: any) => todo.id === params.id);
      return res.status(200).json(dataToShow);
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
      const objIndex = this.todos.findIndex((obj: any) => obj.id === params.id);
      this.todos[objIndex] = { ...body };
      return res.status(201).json(this.todos[objIndex]);
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
      this.todos = this.todos.filter((obj: any) => obj.id !== params.id);
      return res.status(201).send();
    } catch (err) {
      next(err);
    }
  };
}

export default new TodoController();
