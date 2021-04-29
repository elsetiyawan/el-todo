import request from "supertest";
import App from "../../src/App";

const newTodo = require("../mock/new-todo.json");
const path: string = "/todos";

let respData: any;
describe("integration test", () => {
  it("should hit todo create / post", async () => {
    const response = await request(App).post(path).send(newTodo);
    expect(response.statusCode).toBe(201);
    expect(response.body).toMatchObject({
      id: expect.any(String),
      deadline: expect.any(String),
      description: newTodo.description,
      done: newTodo.done,
    });
    respData = response.body;
  });

  it("should hit todo list", async () => {
    const response = await request(App).get(path);
    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual([{ ...respData }]);
  });

  it("should hit todo single read", async () => {
    const response = await request(App).get(`${path}/${respData.id}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual(respData);
  });

  it("should update todo single read", async () => {
    const response = await request(App)
      .put(`${path}/${respData.id}`)
      .send({ ...respData, done: true });
    expect(response.statusCode).toBe(201);
    expect(response.body).toMatchObject({ ...respData, done: true });
  });

  it("should delete the data", async () => {
    const response = await request(App).delete(`${path}/${respData.id}`);
    expect(response.statusCode).toBe(201);
  });
});
