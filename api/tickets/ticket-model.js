const db = require("../../dbConfig.js");
const Users = require("../users/users-model");

// Return list of all tickets
async function find() {
  const tickets = await db("tickets");
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
  return db("tickets").insert(ticket).returning("*");
}

// Removes ticket selected by id
function remove(id) {
  return db("tickets").where({ id }).delete();
}

// Updates ticket by id
function update(ticket, id) {
  return db("tickets").where({ id }).update(ticket);
}

module.exports = {
  find,
  add,
  remove,
  update,
};
