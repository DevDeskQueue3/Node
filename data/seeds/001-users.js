const bcrypt = require("bcryptjs");
const hash = bcrypt.hashSync("12345", 8);

exports.seed = function (knex) {
  return knex("users")
    .del()
    .then(function () {
      return knex("users").insert([
        {
          id: 1,
          name: "testuser1",
          email: "testuser1@mail.com",
          password: hash,
        },
        {
          id: 2,
          name: "testuser2",
          email: "testuser2@mail.com",
          password: hash,
        },
        {
          id: 3,
          name: "testuser3",
          email: "testuser3@mail.com",
          password: hash,
        },
        {
          id: 4,
          name: "testuser4",
          email: "testuser4@mail.com",
          password: hash,
        },
      ]);
    })
    .then(function () {
      return knex.schema.raw("ALTER SEQUENCE users_id_seq RESTART WITH 5");
    });
};
