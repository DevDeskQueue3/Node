const request = require("supertest");
const server = require("../../server.js");
const db = require("../../dbConfig");

let token;
beforeAll(async () => {
  await db.seed.run();
  const credentials = await request(server)
    .post("/api/auth/login")
    .send({ email: "testuser1@mail.com", password: "12345" })
    .expect(200);

  token = credentials.body.token;
  console.log(token);
});

describe("GET /tickets", function () {
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
    // console.log(token);

    const tickets = await request(server)
      .get("/api/tickets")
      .set("Authorization", "Bearer " + token);

    expect(tickets.status).toBe(200);
  });
});

describe("addddddd", () => {
  it("whwhwhwhhwhw", () => {
    return request(server)
      .post("/api/tickets")
      .set("Authorization", "Bearer " + token)
      .send({
        title: "test",
        description: "testing",
        what_ive_tried: "testing",
      })
      .then((res) => {
        console.log(res.body);
        expect(res.type).toBe("application/json");
        expect(res.status).toBe(201);
      });
  });
});
