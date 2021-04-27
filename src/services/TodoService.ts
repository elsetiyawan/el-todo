import { Request } from "express";
import { v4 } from "uuid";

class TodoService {
  body: Request["body"];
  params: Request["params"];
  todos: Array<{
    id: string;
    description: string;
    deadline: Date;
    done: boolean;
  }>;

  constructor(req: Request) {
    this.body = req.body;
    this.params = req.params;
    this.todos = [];
  }

  getAllTodo = () => {
    return this.todos;
  };

  create = () => {
    const data = {
      id: v4(),
      description: this.body.description,
      deadline: new Date(this.body.deadline),
      done: this.body.done,
    };
    this.todos.push(data);
    return data;
  };
}

export default TodoService;
