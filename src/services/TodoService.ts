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
  getAllTodo = (): iTodo[] => {
    return this.todos;
  };

  createTodo = (reqData: iRequestData): iTodo => {
    const data = {
      ...reqData,
      id: v4(),
      deadline: new Date(reqData.deadline),
    };

    this.todos.push(data);
    return data;
  };

  getSingleTodo = async (id: string): Promise<any | iTodo> => {
    const singleTodo = this.todos.find((todo) => todo.id === id);
    if (!singleTodo) {
      throw new APIError({ message: "todo not found", status: 404 });
    } else {
      return singleTodo;
    }
  };

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
