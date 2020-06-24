const router = require("express").Router();
const bcrypt = require("bcryptjs");
const Users = require("../users/users-model.js");

router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  Users.findById(id)
    .then((user) => res.json(user))
    .catch((err) => {
      console.error(err);
      next({ code: 500, message: "There was a problem getting the user" });
    });
});

router.put("/:id", (req, res, next) => {
  const id = Number(req.params.id);
  const { name, email, password, roles } = req.body;

  if (id !== req.jwt.id)
    return next({ code: 403, message: "You can only update your own profile" });

  if (!roles.every((role) => ["ADMIN", "STUDENT", "HELPER"].includes(role)))
    return next({
      code: 400,
      message: "Please provide a valid role",
    });

  if (password) var hash = bcrypt.hashSync(password, 8);

  const changes = { name, email, password: hash, roles };

  Users.update(id, changes)
    .then((user) => res.json(user))
    .catch((err) => {
      console.error(err);
      next({ code: 500, message: "There was a problem getting the user" });
    });
});

module.exports = router;
