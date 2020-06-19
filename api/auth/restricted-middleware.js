const jwt = require("jsonwebtoken");
const secrets = require("../../config/secrets.js");

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.match(/Bearer (.+)/)[1];

    req.jwt = jwt.verify(token, secrets.jwtSecret);
    console.log(req.jwt);
    next();
  } catch (err) {
    next({ code: 401, message: "Unauthorized" });
  }
};
