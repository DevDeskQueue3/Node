const router = require("express").Router();
const Users = require("../users/users-model.js");
const bcrypt = require("bcryptjs");
const { checkInput } = require("../users/users-checks.js");
const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets.js");

router.post("/register", async (req, res, next) => {
  const { name, email, password, role } = req.body;
  if (!(name && email && password && role))
    return next({
      code: 400,
      message: "Please provide a name, email, password, and role",
    });

  if (!["ADMIN", "STUDENT", "HELPER"].includes(role))
    return next({
      code: 400,
      message: "Please provide a valid role",
    });

  const hash = bcrypt.hashSync(password, 8);

  Users.add({ name, email, password: hash, role })
    .then((user) => {
      console.log(user);
      const token = generateToken(user);
      return res.status(201).json({ ...user, token });
    })
    .catch((err) => {
      console.log(err);
      return next({
        code: 500,
        message: "There was a problem creating the user",
      });
    });
});

router.post("/login", async (req, res) => {
  const { name, password } = req.body;
  if (checkInput(req.body)) {
    try {
      const user = await Users.findBy({ name }).first();

      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);

        res.status(200).json({
          message: "Welcome to our API",
          token,
        });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  } else {
    res.status(400).json({
      message:
        "please provide username and password and the password shoud be alphanumeric",
    });
  }
});

function generateToken(user) {
  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const options = {
    expiresIn: "2h",
  };

  return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;
