exports.seed = function (knex, Promise) {
  return knex("tickets")
    .del()
    .then(function () {
      return knex("tickets").insert([
        {
          id: 1,
          postedBy: 1,
          status: "OPEN",
          title: "Ticket 1",
          description: "Ticket 1 description text ",
        },
        {
          id: 2,
          postedBy: 2,
          claimedBy: 1,
          status: "OPEN",
          title: "Ticket 2",
          description: "Ticket 2 description text ",
        },
        {
          id: 3,
          postedBy: 2,
          claimedBy: 1,
          status: "OPEN",
          title: "Ticket 3",
          description: "Ticket 3 description text ",
        },
        {
          id: 4,
          postedBy: 1,
          claimedBy: 2,
          status: "OPEN",
          title: "Ticket 4",
          description: "Ticket 4 description text ",
        },
      ]);
    })
    .then(function () {
      return knex.schema.raw("ALTER SEQUENCE tickets_id_seq RESTART WITH 5");
    });
};
