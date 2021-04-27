import { Request, Response } from "express";
import iController from "./ControllerInterface";
import { v4 } from "uuid";
import TodoService from "../services/TodoService";

class TodoController implements iController {
  public todos: any;
  constructor() {
    this.todos = [];
  }

  index = async (req: Request, res: Response): Promise<Response> => {
    return res.status(200).json(this.todos);
  };

  create = async (req: Request, res: Response): Promise<Response> => {
    const tobePush = { ...req.body, id: v4() };
    this.todos.push(tobePush);
    return res.status(201).json(tobePush);
  };

  show = async (req: Request, res: Response): Promise<Response> => {
    const { params } = req;
    const dataToShow = this.todos.find((todo: any) => todo.id === params.id);
    return res.status(200).json(dataToShow);
  };

  update = async (req: Request, res: Response): Promise<Response> => {
    throw new Error("Not implement yet");
  };

  delete = async (req: Request, res: Response): Promise<Response> => {
    throw new Error("Not implement yet");
  };
}

export default new TodoController();
