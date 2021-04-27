import { Request } from "express";
import APIError from "helpers/APIError";
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

let todos: iTodo[] = [];

class TodoService {
  getAllTodo = (): iTodo[] => {
    return todos;
  };

  create = (reqData: iRequestData): iTodo => {
    const data = {
      ...reqData,
      id: v4(),
      deadline: new Date(reqData.deadline),
    };

    todos.push(data);
    return data;
  };

  getSingleTodoById = (id: string): void | iTodo => {
    const singleTodo = todos.find((todo) => todo.id === id);
    if (!singleTodo) {
      throw new APIError({ message: "todo not found" });
    } else {
      return singleTodo;
    }
  };
}

export default TodoService;
