exports.seed = function (knex) {
  return knex("roles")
    .del()
    .then(function () {
      return knex("roles").insert([
        {
          "user-id": 1,
          role: "STUDENT",
        },
        {
          "user-id": 2,
          role: "STUDENT",
        },
        {
          "user-id": 3,
          role: "STUDENT",
        },
        {
          "user-id": 4,
          role: "STUDENT",
        },
      ]);
    });
};
