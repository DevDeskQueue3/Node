const db = require("../dbConfig.js");
const usersChecks = require("./users-checks.js");

module.exports = {
  add,
  find,
  findBy,
  findById,
};

function find() {
  return db("users").select("*").orderBy("id");
}

function findBy(filter) {
  return db("users").where(filter).orderBy("id");
}

async function add(user) {
  const { name, email, password, role } = user;
  const [id] = await db("users").insert({ name, email, password }, "id");
  await db("roles").insert({ userID: id, role });
  return findById(id);
}

async function findById(id) {
  const user = await db("users")
    .where({ id })
    .select("id", "name", "email")
    .first();
  const roles = await db("roles").where({ userID: id }).select("role");
  user.roles = roles.map(({ role }) => role);

  return user;
}
