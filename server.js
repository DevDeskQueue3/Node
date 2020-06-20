const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const server = express();
const verifyJWT = require("./middleware/verifyJWT");
const authRouter = require("./api/auth/auth-router.js");
const ticketRouter = require("./api/tickets/tickets-router.js");

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get("/", (req, res) => res.json({ server: "up" }));

server.use("/api/auth", authRouter);

/* AUTHENTICATED ROUTES */
server.use(verifyJWT);
server.use("/api/tickets", ticketRouter);

server.use(errorHandler);

module.exports = server;

function errorHandler(err, req, res, next) {
  res.status(err.code).json({ message: err.message });
}
