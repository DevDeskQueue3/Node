const request = require("supertest");
const server = require("../../server.js");
const db = require("../../dbConfig");

let token;
let userId;

beforeAll(async () => {
  await db.seed.run();
  const credentials = await request(server)
    .post("/api/auth/login")
    .send({ email: "testuser1@mail.com", password: "12345" })
    .expect(200);

  token = credentials.body.token;
  userId = credentials.body.id;
});

describe("GET /tickets", function () {
  it("it should return error 401 if user is not authorized", async () => {
    const tickets = await request(server).get("/api/tickets");
    expect(tickets.status).toBe(401);
  });

  it("it should return 200 if user is authorized", async () => {
    const credentials = await request(server)
      .post("/api/auth/login")
      .send({ email: "testuser1@mail.com", password: "12345" })
      .expect(200);

    token = credentials.body.token;

    const tickets = await request(server)
      .get("/api/tickets")
      .set("Authorization", "Bearer " + token);

    expect(tickets.status).toBe(200);
  });
});

describe("POST /tickets", () => {
  it("it should return error 401 if user in not authorized to add tickets to database", () => {
    return request(server)
      .post("/api/tickets")
      .send({
        title: "Ticket title",
        description: "Ticket description",
        what_ive_tried: "",
      })
      .then((res) => {
        expect(res.status).toBe(401);
      });
  });

  it("it should return error 400 if value of title, description or what_ive_tried is missing", () => {
    return request(server)
      .post("/api/tickets")
      .set("Authorization", "Bearer " + token)
      .send({
        title: "",
        description: "Ticket description",
        what_ive_tried: "Ticket actions",
      })
      .then((res) => {
        expect(res.status).toBe(400);
      });
  });

  it("it should return 201 and create new ticket in database", () => {
    return request(server)
      .post("/api/tickets")
      .set("Authorization", "Bearer " + token)
      .send({
        title: "Ticket title",
        description: "Ticket description",
        what_ive_tried: "Ticket actions",
      })
      .then((res) => {
        expect(res.status).toBe(201);
      });
  });
});

describe("PUT /tickets/:id", function () {
  it("it should return 201 and update ticket of id 5 in database", () => {
    return request(server)
      .put("/api/tickets/1")
      .set("Authorization", "Bearer " + token)
      .send({
        title: "New title",
        description: "New ticket description",
        what_ive_tried: "New actions",
      })
      .then((res) => {
        expect(res.status).toBe(201);
      });
  });

  it("it should return 400 if value of ticket title or description is missing", () => {
    return request(server)
      .put("/api/tickets/1")
      .set("Authorization", "Bearer " + token)
      .send({
        title: "",
        description: "New ticket description",
        what_ive_tried: "New actions",
      })
      .then((res) => {
        expect(res.status).toBe(400);
      });
  });
});

describe("DELETE /tickets/:id", function () {
  it("it should return 200 and delete ticket from database", () => {
    return request(server)
      .delete("/api/tickets/1")
      .set("Authorization", "Bearer " + token)
      .send({
        userId,
        ticketID: 1,
      })
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });

  it("it should return 404 if ticket does not exist", () => {
    return request(server)
      .delete("/api/tickets/10")
      .set("Authorization", "Bearer " + token)
      .send({
        userId,
        ticketID: 10,
      })
      .then((res) => {
        expect(res.status).toBe(404);
      });
  });
});
