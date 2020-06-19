const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const server = express();
const authRouter = require("./api/auth/auth-router.js");
const ticketRouter = require("./api/tickets/tickets-router.js");

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/api/auth", authRouter);
server.use("/api/tickets", ticketRouter);

server.get("/", (req, res) => res.json({ server: "up" }));
server.use(errorHandler);

module.exports = server;

function errorHandler(err, req, res, next) {
  res.status(err.code).json({ message: err.message });
}
