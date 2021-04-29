import APIError from "../helpers/APIError";
import { v4 } from "uuid";
import { isDateValid } from "../helpers/helpers";

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
      done: false,
    };
    try {
      this.todos.push(data);
      return data;
    } catch (err) {
      throw new APIError({ message: "Cannot create todo", status: 400 });
    }
  };

  /** get single todo */
  getSingleTodo = async (id: string): Promise<any | iTodo> => {
    const singleTodo = this.todos.find((todo) => todo.id === id);
    if (!singleTodo) {
      throw new APIError({ message: "Todo task not found", status: 400 });
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
      // check the date
      if (
        !isDateValid(
          new Date(this.todos[targetTodo].deadline),
          new Date(values.deadline)
        )
      ) {
        throw new APIError({ message: "Date is not valid to be updated" });
      }

      this.todos[targetTodo] = {
        ...values,
        id: id,
        deadline: new Date(values.deadline),
      };
      return this.todos[targetTodo];
    } else {
      throw new APIError({ message: "Todo task not found", status: 400 });
    }
  };

  /** delete single todo */
  deleteSingleTodo = async (id: string): Promise<any> => {
    const targetTodo = this.todos.findIndex((todo) => todo.id === id);
    if (targetTodo >= 0) {
      this.todos = this.todos.filter((todo) => todo.id !== id);
      return true;
    } else {
      throw new APIError({ message: "Todo task not found", status: 400 });
    }
  };
}

export default new TodoService();
