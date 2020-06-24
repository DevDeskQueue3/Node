const router = require("express").Router();
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

module.exports = router;
