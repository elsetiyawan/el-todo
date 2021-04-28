import TodoController from "../../src/controllers/TodoController";
import httpMocks from "node-mocks-http";
import TodoService from "../../src/services/TodoService";
const newTodo = require("../mock/new-todo.json");

TodoService.getAllTodo = jest.fn();
TodoService.createTodo = jest.fn();
TodoService.getSingleTodo = jest.fn();
TodoService.updateSingleTodo = jest.fn();
TodoService.deleteSingleTodo = jest.fn();

let req: any, res: any, next: any, resData: any;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});

describe("Testing the todoController existing", () => {
  it("should exist as object", () => {
    expect(typeof TodoController).toBe("object");
  });
});

describe("Testing the todoController.create", () => {
  beforeEach(() => {
    req.body = newTodo;
  });
  it("the function should exist", () => {
    expect(typeof TodoController.create).toBe("function");
  });

  it("should call TodoService.create function", async () => {
    await TodoController.create(req, res, next);
    expect(TodoService.createTodo).toBeCalledWith(newTodo);
  });

  it("the function should return 201", async () => {
    TodoService.createTodo.mockReturnValue(newTodo);
    await TodoController.create(req, res, next);
    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res._getJSONData()).toStrictEqual(newTodo);
  });

  it("should return error", async () => {
    const errorMessage = { messsage: "Proses failed" };
    const rejectedPromise = Promise.reject(errorMessage);
    TodoService.createTodo.mockReturnValue(rejectedPromise);
    await TodoController.create(req, res, next);
    expect(next).toBeCalledWith(errorMessage);
  });
});

describe("Testing the todoController.index", () => {
  it("the function should exist", () => {
    expect(typeof TodoController.index).toBe("function");
  });

  it("should call TodoService.getAllTodo", async () => {
    await TodoController.index(req, res, next);
    expect(TodoService.getAllTodo).toBeCalled();
  });

  it("should return the correct data and status 200", async () => {
    TodoService.getAllTodo.mockReturnValue([newTodo]);
    await TodoController.index(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
    expect(Array.isArray(res._getJSONData())).toBeTruthy();
    const sampleResponse = res._getJSONData();
    expect(sampleResponse[0]).toStrictEqual(newTodo);
  });
});

describe("Testing the todoController.show", () => {
  it("the function should exist", () => {
    expect(typeof TodoController.show).toBe("function");
  });

  it("should call TodoService.getSingleTodo", async () => {
    req.params.id = "1";
    await TodoController.show(req, res, next);
    expect(TodoService.getSingleTodo).toBeCalledWith("1");
  });

  it("should return the correct value", async () => {
    TodoService.getSingleTodo.mockReturnValue(newTodo);
    await TodoController.show(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res._getJSONData()).toStrictEqual(newTodo);
  });

  it("should call next with error", async () => {
    const errorMessage = { message: "Not found" };
    const promiseError = Promise.reject(errorMessage);
    TodoService.getSingleTodo.mockReturnValue(promiseError);
    await TodoController.show(req, res, next);
    expect(next).toBeCalledWith(errorMessage);
  });
});

describe("Testing the todoController.update", () => {
  it("the function should exist", () => {
    expect(typeof TodoController.update).toBe("function");
  });

  it("should call TodoService updatesingleTodo", async () => {
    req.params.id = "1";
    req.body = newTodo;
    await TodoController.update(req, res, next);
    expect(TodoService.updateSingleTodo).toBeCalledWith("1", newTodo);
  });

  it("should return the correct data with 200 status", async () => {
    TodoService.updateSingleTodo.mockReturnValue(newTodo);
    await TodoController.update(req, res, next);
    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res._getJSONData()).toStrictEqual(newTodo);
  });
});

describe("Testing the todoController.delete", () => {
  it("the function should exist", () => {
    expect(typeof TodoController.delete).toBe("function");
  });

  it("should call todoService delete single todo", async () => {
    req.params.id = "1";
    await TodoController.delete(req, res, next);
    expect(TodoService.deleteSingleTodo).toBeCalledWith("1");
  });

  it("should return the correct data with 200 status", async () => {
    await TodoController.delete(req, res, next);
    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it("should call next with error message", async () => {
    const errorMessage = { message: "delete is error" };
    const promiseError = Promise.reject(errorMessage);
    TodoService.deleteSingleTodo.mockReturnValue(promiseError);
    await TodoController.delete(req, res, next);
    expect(next).toBeCalledWith(errorMessage);
  });
});
