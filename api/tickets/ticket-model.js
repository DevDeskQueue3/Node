const db = require("../../dbConfig.js");

// Returns an array of all tickets with user names and ids
async function find(filter) {
  return db("tickets as t")
    .join("users as p", "p.id", "t.posted_by")
    .leftJoin("users as c", "c.id", "t.claimed_by")
    .select(
      "t.id as ticket_id",
      "p.id as posted_by_id",
      "p.name as posted_by_name",
      "t.posted_at",
      "t.status",
      "t.title",
      "t.description",
      "c.id as claimed_by_id",
      "c.name as claimed_by_name"
    )
    .orderBy("posted_at");
}

// Returns an array of all tickets filtered by ticket status

async function findBy(filter) {
  return db("tickets as t")
    .join("users as p", "p.id", "t.posted_by")
    .leftJoin("users as c", "c.id", "t.claimed_by")
    .select(
      "t.id as ticket_id",
      "p.id as posted_by_id",
      "p.name as posted_by_name",
      "t.posted_at",
      "t.status",
      "t.title",
      "t.description",
      "c.id as claimed_by_id",
      "c.name as claimed_by_name"
    )
    .orderBy("posted_at")
    .where({ "t.status": filter });
}

async function findById(ticketID) {
  return db("tickets as t")
    .join("users as p", "p.id", "t.posted_by")
    .leftJoin("users as c", "c.id", "t.claimed_by")
    .select(
      "t.id as ticket_id",
      "p.id as posted_by_id",
      "p.name as posted_by_name",
      "t.posted_at",
      "t.status",
      "t.title",
      "t.description",
      "c.id as claimed_by_id",
      "c.name as claimed_by_name"
    )
    .orderBy("posted_at")
    .where({
      "t.id": ticketID,
    });
}

// Returns an array of all tickets with user names a

function update(ticket, ticketID, userID) {
  return db("tickets")
    .where({ id: ticketID, posted_by: userID })
    .update(ticket)
    .returning(["id", "posted_at", "status", "title", "description"]);
}

// Add new ticket to database
function add(ticket) {
  return db("tickets")
    .insert(ticket)
    .returning(["id", "posted_at", "status", "title", "description"]);
}

// Removes ticket selected by id posted by user with `userID`
function remove(ticketID, userID) {
  return db("tickets").where({ id: ticketID, posted_by: userID }).delete();
}

// Updates ticket by id
function update(ticket, ticketID, userID) {
  return db("tickets")
    .where({ id: ticketID, posted_by: userID })
    .update(ticket)
    .returning(["id", "posted_at", "status", "title", "description"]);
}

module.exports = {
  find,
  findBy,
  findById,
  add,
  remove,
  update,
};
