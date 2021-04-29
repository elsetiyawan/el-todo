import request from "supertest";
import App from "../../src/App";

const newTodo = require("../mock/new-todo.json");
const path: string = "/todos";

let respData: any;
describe("integration test", () => {
  it("should return not found", async () => {
    const response = await request(App).get("/nolink");
    expect(response.status).toBe(404);
    expect(response.body).toMatchObject({
      code: 404,
      message: expect.any(String),
    });
  });

  it("should hit todo create / post", async () => {
    const response = await request(App).post(path).send(newTodo);
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      id: expect.any(String),
      deadline: expect.any(String),
      description: newTodo.description,
      done: expect.any(Boolean),
    });
    respData = response.body;
  });

  it("should return error", async () => {
    const response = await request(App).post(path).send();
    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      code: 400,
      message: "Validation Failed",
      errors: expect.any(Array),
    });
  });

  it("should hit todo list", async () => {
    const response = await request(App).get(path);
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual([{ ...respData }]);
  });

  it("should return data not found, the id is invalid", async () => {
    const response = await request(App).get(`${path}/1`);
    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      code: 400,
      message: expect.any(String),
    });
  });

  it("should hit todo single read", async () => {
    const response = await request(App).get(`${path}/${respData.id}`);
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual(respData);
  });

  it("should return validation error, the data is is invalid", async () => {
    const response = await request(App).put(`${path}/1`).send();
    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      code: 400,
      message: expect.any(String),
    });
  });

  it("should return not found, the id is invalid", async () => {
    const updateData = { ...respData, done: true };
    delete updateData["id"];
    const response = await request(App).put(`${path}/1`).send(updateData);
    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      code: 400,
      message: expect.any(String),
    });
  });

  it("should update todo single read", async () => {
    const updateData = { ...respData, done: true };
    delete updateData["id"];
    const response = await request(App)
      .put(`${path}/${respData.id}`)
      .send(updateData);
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(updateData);
  });

  it("should delete the data", async () => {
    const response = await request(App).delete(`${path}/${respData.id}`);
    expect(response.status).toBe(201);
  });
});
