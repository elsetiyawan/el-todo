import TodoController from "../../src/controllers/TodoController";
import httpMocks from "node-mocks-http";
const newTodo = require("../mock/new-todo.json");
const allTodo = require("../mock/list-todo.json");

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

  it("the function should return 201", () => {
    TodoController.create(req, res, next);
    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBeTruthy();
    resData = res._getJSONData();
    expect(resData).toMatchObject({
      id: expect.any(String),
      description: newTodo.description,
      deadline: expect.any(String),
      done: newTodo.done,
    });
  });
});

describe("Testing the todoController.index", () => {
  it("the function should exist", () => {
    expect(typeof TodoController.index).toBe("function");
  });

  it("the function should return 200 and list of data", () => {
    TodoController.index(req, res, next);
    const responseData = res._getJSONData();
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
    expect(responseData[0]).toMatchObject({
      id: expect.any(String),
      description: newTodo.description,
      deadline: expect.any(String),
      done: newTodo.done,
    });
  });
});

describe("Testing the todoController.show", () => {
  it("the function should exist", () => {
    expect(typeof TodoController.show).toBe("function");
  });

  it("should return the correct data with 200 status", async () => {
    req.params.id = resData.id;
    await TodoController.show(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res._getJSONData()).toStrictEqual(resData);
  });
});

describe("Testing the todoController.update", () => {
  it("the function should exist", () => {
    expect(typeof TodoController.update).toBe("function");
  });

  it("should return the correct data with 200 status", async () => {
    req.params.id = resData.id;
    const updateData = { ...resData, done: true };
    req.body = updateData;
    await TodoController.update(req, res, next);
    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res._getJSONData()).toMatchObject({
      id: resData.id,
      description: updateData.description,
      deadline: expect.any(String),
      done: updateData.done,
    });
  });
});

describe("Testing the todoController.delete", () => {
  it("the function should exist", () => {
    expect(typeof TodoController.delete).toBe("function");
  });

  it("should return the correct data with 200 status", async () => {
    req.params.id = resData.id;
    await TodoController.delete(req, res, next);
    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBeTruthy();
  });
});
