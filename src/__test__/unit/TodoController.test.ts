import TodoController from "../../controllers/TodoController";
import httpMocks from "node-mocks-http";
const newTodo = require("../mock/new-todo.json");
const allTodo = require("../mock/list-todo.json");

let req: any, res: any, next: any, testData: any;

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
    TodoController.create(req, res);
    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBeTruthy();
    testData = res._getJSONData();
    const response = res._getJSONData();
    expect(response.id).toBeTruthy();
    expect(response.description).toBe(newTodo.description);
    expect(response.deadline).toBe(newTodo.deadline);
    expect(response.done).toBe(newTodo.done);
  });
});

describe("Testing the todoController.index", () => {
  it("the function should exist", () => {
    expect(typeof TodoController.index).toBe("function");
  });

  it("the function should return 200 and list of data", () => {
    TodoController.index(req, res);
    const responseData = res._getJSONData();
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
    expect(responseData[0]).toMatchObject(newTodo);
  });
});

describe("Testing the todoController.show", () => {
  it("the function should exist", () => {
    expect(typeof TodoController.show).toBe("function");
  });

  it("should return the correct data with 200 status", () => {
    req.params.id = testData.id;
    TodoController.show(req, res);
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res._getJSONData()).toStrictEqual(testData);
  });
});
