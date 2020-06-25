const request = require("supertest");
const { clean } = require("knex-cleaner");
const server = require("../../server.js");
const db = require("../../dbConfig");

beforeAll(() =>
  clean(db, {
    mode: "truncate",
    restartIdentity: true,
    ignoreTables: ["knex_migrations", "knex_migrations_lock"],
  })
);

describe("setup test", () => {
  it("runs", () => {
    expect(true).toBe(true);
  });
});

describe("POST /api/auth/register", () => {
  it("returns 201 and creates a new user in the database", () => {
    return request(server)
      .post("/api/auth/register")
      .send({
        name: "Alice",
        email: "alice@gmail.com",
        password: "hello",
        roles: ["STUDENT", "HELPER"],
      })
      .then(async (res) => {
        const [user] = await db("users").select("*").where({ id: res.body.id });
        expect(res.status).toBe(201);
        expect(user.email).toBe("alice@gmail.com");
      });
  });

  it("returns 400 when required fields are not provided", () => {
    return request(server)
      .post("/api/auth/register")
      .send({
        email: "bob@gmail.com",
        password: "hello",
      })
      .then((res) => {
        expect(res.status).toBe(400);
      });
  });

  it("returns 400 when providing an invalid role", () => {
    return request(server)
      .post("/api/auth/register")
      .send({
        name: "Carol",
        email: "carol@gmail.com",
        password: "hello",
        roles: ["foo"],
      })
      .then((res) => {
        expect(res.status).toBe(400);
      });
  });
});

describe("POST /api/auth/login", () => {
  it("returns 200 with a token", () => {
    return request(server)
      .post("/api/auth/login")
      .send({
        email: "alice@gmail.com",
        password: "hello",
      })
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body.token).toBeTruthy();
      });
  });

  it("returns 401 when providing the wrong password", () => {
    return request(server)
      .post("/api/auth/login")
      .send({
        email: "alice@gmail.com",
        password: "hellooooooooooo",
      })
      .then((res) => {
        expect(res.status).toBe(401);
      });
  });

  it("returns 404 when attempting to log in with a non-existent user", () => {
    return request(server)
      .post("/api/auth/login")
      .send({
        email: "foo@bar.com",
        password: "hello",
      })
      .then((res) => {
        expect(res.status).toBe(404);
      });
  });
});
