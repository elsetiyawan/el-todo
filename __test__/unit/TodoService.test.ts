import TodoService from "../../src/services/TodoService";

const newTodo = require("../mock/new-todo.json");

let firstResult: any;

describe("Testing Todo Service initiate", () => {
  test("TodoService should be exist", () => {
    expect(typeof TodoService).toBe("object");
    expect(typeof TodoService.createTodo).toBe("function");
    expect(typeof TodoService.getAllTodo).toBe("function");
    expect(typeof TodoService.getSingleTodo).toBe("function");
    expect(typeof TodoService.updateSingleTodo).toBe("function");
    expect(typeof TodoService.deleteSingleTodo).toBe("function");
  });
});

describe("Testing TodoService.createTodo", () => {
  it("should save the data", async () => {
    firstResult = await TodoService.createTodo(newTodo);
    expect(firstResult).toMatchObject({
      id: expect.any(String),
      description: expect.any(String),
      deadline: expect.any(Date),
      done: expect.any(Boolean),
    });
  });
});

describe("Testing TodoService.index", () => {
  it("should return todo list", async () => {
    const todoList = await TodoService.getAllTodo();
    expect(todoList).toMatchObject([firstResult]);
  });
});

describe("Testing TodoService.getSingleTodo", () => {
  it("should return spesific todo", async () => {
    const todo = await TodoService.getSingleTodo(firstResult.id);
    expect(todo).toMatchObject(firstResult);
  });

  it("should reject when id is wrong", async () => {
    expect(TodoService.getSingleTodo("dabudi")).rejects.toThrow();
  });
});

describe("Test TodoService.updateSingleTodo", () => {
  it("should return the right todo", async () => {
    const updateTodo = await TodoService.updateSingleTodo(firstResult.id, {
      ...firstResult,
      done: true,
    });
    expect(updateTodo).toStrictEqual({ ...firstResult, done: true });
  });

  it("should throw error with wrong id", async () => {
    expect(
      TodoService.updateSingleTodo("wrongId", { ...firstResult, done: true })
    ).rejects.toThrow();
  });
});

describe("Test TodoService.deleteSingleTodo", () => {
  it("should delete the data", async () => {
    const dropData = await TodoService.deleteSingleTodo(firstResult.id);
    expect(dropData).toBeTruthy();
  });

  it("should throw error", async () => {
    expect(TodoService.deleteSingleTodo(firstResult.id)).rejects.toThrow();
  });
});
