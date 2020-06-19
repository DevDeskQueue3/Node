const db = require('../dbConfig.js');

// Return list of all tickets
function find() {
	return db('tickets');
}

// Add new ticket to database
function add(ticket) {
	return db('tickets').insert(ticket).returning('*');
}

// Removes ticket selected by id
function remove(id) {
	return db('tickets').where({ id }).delete();
}

// Updates ticket by id
function update(ticket, id) {
	return db('tickets').where({ id }).update(ticket);
}

module.exports = {
	find,
	add,
	remove,
	update,
};
