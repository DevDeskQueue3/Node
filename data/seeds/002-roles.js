exports.seed = function (knex) {
  return knex("roles")
    .del()
    .then(function () {
      return knex("roles").insert([
        {
          user_id: 1,
          role: "STUDENT",
        },
        {
          user_id: 1,
          role: "HELPER",
        },
        {
          user_id: 2,
          role: "STUDENT",
        },
        {
          user_id: 3,
          role: "STUDENT",
        },
        {
          user_id: 4,
          role: "STUDENT",
        },
      ]);
    });
};
