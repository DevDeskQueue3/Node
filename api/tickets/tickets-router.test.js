const request = require("supertest");
const server = require("../../server.js");

let token;

describe("GET /tickets", () => {
  it("it should require authorization", async () => {
    const tickets = await request(server).get("/api/tickets");
    expect(tickets.status).toBe(401);
  });

  it("it should require authorization", async () => {
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
