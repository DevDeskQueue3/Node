exports.seed = function (knex) {
  return knex("categories")
    .del()
    .then(function () {
      return knex("categories").insert([
        { ticket_id: 1, category: "JavaScript" },
        { ticket_id: 2, category: "Node" },
        { ticket_id: 2, category: "React" },
        { ticket_id: 2, category: "JavaScript" },
        { ticket_id: 3, category: "HTML" },
        { ticket_id: 3, category: "CSS" },
        { ticket_id: 3, category: "React" },
        { ticket_id: 4, category: "React" },
        { ticket_id: 4, category: "HTML" },
        { ticket_id: 4, category: "JavaScript" },
      ]);
    });
};
