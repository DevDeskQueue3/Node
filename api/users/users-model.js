const db = require("../../dbConfig.js");

module.exports = {
  add,
  find,
  findBy,
  findOneBy,
  findById,
  getNameByID,
};

function find() {
  return db("users").select("*").orderBy("id");
}

function findBy(filter) {
  return db("users").where(filter).orderBy("id");
}

async function findOneBy(filter) {
  const user = await db("users").where(filter).first();
  if (!user) return;
  const roles = await db("roles").where({ user_id: user.id }).select("role");
  user.roles = roles.map(({ role }) => role);

  return user;
}

async function add(user) {
  const { name, email, password, role } = user;
  const [id] = await db("users").insert({ name, email, password }, "id");
  await db("roles").insert({ user_id: id, role });
  return findById(id);
}

async function findById(id) {
  const user = await db("users")
    .where({ id })
    .select("id", "name", "email")
    .first();
  const roles = await db("roles").where({ user_id: id }).select("role");
  user.roles = roles.map(({ role }) => role);

  return user;
}

function getNameByID(id) {
  return db("users").where({ id }).select("name").first();
}
