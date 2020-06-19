exports.seed = function (knex) {
  return knex("users")
    .del()
    .then(function () {
      return knex("users").insert([
        {
          id: 1,
          name: "testuser1",
          email: "testuser1@mail.com",
          password: "12345",
        },
        {
          id: 2,
          name: "testuser2",
          email: "testuser2@mail.com",
          password: "12345",
        },
        {
          id: 3,
          name: "testuser3",
          email: "testuser3@mail.com",
          password: "12345",
        },
        {
          id: 4,
          name: "testuser4",
          email: "testuser4@mail.com",
          password: "12345",
        },
      ]);
    });
};
