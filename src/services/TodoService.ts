import APIError from "../helpers/APIError";
import { v4 } from "uuid";

interface iTodo {
  id: string;
  desciption: string;
  deadline: Date;
  done: boolean;
}

interface iRequestData {
  desciption: string;
  deadline: Date | string;
  done: boolean;
}

class TodoService {
  todos: iTodo[];
  constructor() {
    this.todos = [];
  }

  /** get all todo list */
  getAllTodo = (): iTodo[] => {
    return this.todos;
  };

  /** create new todo task */
  createTodo = async (reqData: iRequestData): Promise<any | iTodo> => {
    const data = {
      ...reqData,
      id: v4(),
      deadline: new Date(reqData.deadline),
    };
    try {
      this.todos.push(data);
      return data;
    } catch (err) {
      throw new APIError({ message: "something wrong", status: 500 });
    }
  };

  /** get single todo */
  getSingleTodo = async (id: string): Promise<any | iTodo> => {
    const singleTodo = this.todos.find((todo) => todo.id === id);
    if (!singleTodo) {
      throw new APIError({ message: "todo not found", status: 404 });
    } else {
      return singleTodo;
    }
  };

  /** update single todo */
  updateSingleTodo = async (
    id: string,
    values: iRequestData
  ): Promise<any | iTodo> => {
    const targetTodo = this.todos.findIndex((todo) => todo.id === id);
    if (targetTodo >= 0) {
      this.todos[targetTodo] = {
        ...values,
        id: id,
        deadline: new Date(values.deadline),
      };
      return this.todos[targetTodo];
    } else {
      throw new APIError({ message: "Todo not found", status: 404 });
    }
  };

  /** delete single todo */
  deleteSingleTodo = async (id: string): Promise<any> => {
    const targetTodo = this.todos.findIndex((todo) => todo.id === id);
    if (targetTodo >= 0) {
      this.todos = this.todos.filter((todo) => todo.id !== id);
      return true;
    } else {
      throw new APIError({ message: "Todo not found", status: 404 });
    }
  };
}

export default new TodoService();
