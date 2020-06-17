const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get("/", (req, res) => res.json({ server: "up" }));
server.use(errorHandler);

module.exports = server;

function errorHandler(err, req, res, next) {
  res.status(err.code).json({ message: err.message });
}
