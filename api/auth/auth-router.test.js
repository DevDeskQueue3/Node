const request = require("supertest");
const server = require("../../server.js");
const db = require("../../dbConfig");

beforeAll(() => db("users").del());

describe("setup test", () => {
  it("runs", () => {
    expect(true).toBe(true);
  });
});

describe("POST /api/auth/register", () => {
  it("returns 201", () => {
    return request(server)
      .post("/api/auth/register")
      .send({
        name: "Alice",
        email: "alice@gmail.com",
        password: "hello",
        role: "STUDENT",
      })
      .then((res) => {
        expect(res.status).toBe(201);
      });
  });
});
