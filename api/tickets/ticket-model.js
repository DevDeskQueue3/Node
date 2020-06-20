const db = require("../../dbConfig.js");
const Users = require("../users/users-model");

// Return an array of all tickets,
// or a selection of ticket with an optional filter
async function find(filter) {
  const tickets = filter
    ? await db("tickets").where(filter)
    : await db("tickets");

  await Promise.all([
    ...tickets.map((ticket, i) => {
      const userID = ticket.postedBy;
      return Users.getNameByID(userID).then(
        ({ name }) => (tickets[i].postedBy = { userID, name })
      );
    }),
    ...tickets.map((ticket, i) => {
      if (!ticket.claimedBy) return;
      const userID = ticket.claimedBy;
      return Users.getNameByID(userID).then(
        ({ name }) => (tickets[i].claimedBy = { userID, name })
      );
    }),
  ]);

  return tickets;
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
  add,
  remove,
  update,
};
