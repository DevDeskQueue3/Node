const db = require("../../dbConfig.js");

// Returns an array of all tickets with user names and ids
function find() {
  return db("tickets as t")
    .with("cat", (qb) => {
      qb.select("ticket_id", db.raw("ARRAY_AGG(category) as categories"))
        .from("categories")
        .groupBy("ticket_id");
    })
    .join("users as p", "p.id", "t.posted_by")
    .leftJoin("users as cl", "cl.id", "t.claimed_by")
    .leftJoin("cat", "cat.ticket_id", "t.id")
    .select(
      "t.id as ticket_id",
      "p.id as posted_by_id",
      "p.name as posted_by_name",
      "t.posted_at",
      "t.status",
      "t.title",
      "t.description",
      "t.what_ive_tried",
      "cat.categories",
      "cl.id as claimed_by_id",
      "cl.name as claimed_by_name"
    )
    .orderBy("t.id");
}

// Returns an array of all tickets filtered by ticket status

function findBy(filter) {
  return db("tickets as t")
    .with("cat", (qb) => {
      qb.select("ticket_id", db.raw("ARRAY_AGG(category) as categories"))
        .from("categories")
        .groupBy("ticket_id");
    })
    .join("users as p", "p.id", "t.posted_by")
    .leftJoin("users as cl", "cl.id", "t.claimed_by")
    .leftJoin("cat", "cat.ticket_id", "t.id")
    .select(
      "t.id as ticket_id",
      "p.id as posted_by_id",
      "p.name as posted_by_name",
      "t.posted_at",
      "t.status",
      "t.title",
      "t.description",
      "t.what_ive_tried",
      "cat.categories",
      "cl.id as claimed_by_id",
      "cl.name as claimed_by_name"
    )
    .where(filter)
    .orderBy("t.id");
}

// Returns ticket of specified id

async function findById(ticketID) {
  return db("tickets as t")
    .with("cat", (qb) => {
      qb.select("ticket_id", db.raw("ARRAY_AGG(category) as categories"))
        .from("categories")
        .groupBy("ticket_id");
    })
    .join("users as p", "p.id", "t.posted_by")
    .leftJoin("users as cl", "cl.id", "t.claimed_by")
    .leftJoin("cat", "cat.ticket_id", "t.id")
    .select(
      "t.id as ticket_id",
      "p.id as posted_by_id",
      "p.name as posted_by_name",
      "t.posted_at",
      "t.status",
      "t.title",
      "t.description",
      "t.what_ive_tried",
      "cat.categories",
      "cl.id as claimed_by_id",
      "cl.name as claimed_by_name"
    )
    .where({
      "t.id": ticketID,
    })
    .first();
}

// Returns ticket of specified id with comments

async function findByIdWithComments(ticketID) {
  return db("tickets as t")
    .join("users as p", "p.id", "t.posted_by")
    .leftJoin("users as c", "c.id", "t.claimed_by")
    .leftJoin("comments", "comments.ticket_id", "t.id")
    .select(
      "t.id as ticket_id",
      "p.id as posted_by_id",
      "p.name as posted_by_name",
      "t.posted_at",
      "t.status",
      "t.title",
      "t.description",
      "t.what_ive_tried",
      "c.id as claimed_by_id",
      "c.name as claimed_by_name",
      "comments.content",
      "comments.posted_by as comments_by",
      "comments.posted_at as comments_at"
    )
    .orderBy("t.id")
    .where({
      "t.id": ticketID,
    });
}

// Add new ticket to database
function add(ticket, categories) {
  return db
    .transaction(function (trx) {
      return trx
        .insert(ticket, "id")
        .into("tickets")
        .then(async function ([id]) {
          if (!categories) return id;
          const rows = categories.map((category) => ({
            ticket_id: id,
            category,
          }));
          await db.batchInsert("categories", rows).transacting(trx);
          return id;
        });
    })
    .then((id) => findById(id));
}

// Removes ticket selected by id posted by user with `userID`
function remove(ticketID, userID) {
  return db("tickets").where({ id: ticketID, posted_by: userID }).delete();
}

// Updates ticket by id
function update(ticket, categories, ticketID, userID) {
  return db
    .transaction(function (trx) {
      return db("tickets")
        .transacting(trx)
        .where({ id: ticketID, posted_by: userID })
        .update(ticket, "id")
        .then(async function ([id]) {
          if (!categories) return id;
          await db("categories")
            .transacting(trx)
            .where({ ticket_id: id })
            .del();
          const rows = categories.map((category) => ({
            ticket_id: id,
            category,
          }));
          await db.batchInsert("categories", rows).transacting(trx);
          return id;
        });
    })
    .then((id) => findById(id));
}

// asserts a change on any ticket
function assert(change, ticketID) {
  return db("tickets")
    .where({ id: ticketID })
    .update(change, ["id as ticket_id", "claimed_by"]);
}

module.exports = {
  assert,
  find,
  findBy,
  findById,
  findByIdWithComments,
  add,
  remove,
  update,
};
