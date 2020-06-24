const db = require("../../dbConfig.js");

module.exports = {
  add,
  find,
  findBy,
  findOneBy,
  findById,
  getNameByID,
  update,
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
  user.roles = await db("roles").pluck("role").where({ user_id: user.id });
  return user;
}

async function add(user) {
  const { name, email, password, role } = user;
  return db
    .transaction(async (trx) => {
      const [id] = await trx("users").insert({ name, email, password }, "id");
      await trx("roles").insert({ user_id: id, role });
      return id;
    })
    .then((id) => findById(id));
}
// Updates user by ID
function update(userID, changes) {
  const { name, email, password, roles } = changes;
  return db
    .transaction(async (trx) => {
      const [id] = await trx("users")
        .where({ id: userID })
        .update({ name, email, password }, "id");
      if (!roles) return id;
      await trx("roles").where({ user_id: id }).del();
      const rows = roles.map((role) => ({
        user_id: userID,
        role,
      }));
      await trx.batchInsert("roles", rows);
      return id;
    })
    .then((id) => findById(id));
}

async function findById(id) {
  const user = await db("users")
    .where({ id })
    .select("id", "name", "email")
    .first();
  if (!user) return;
  user.roles = await db("roles").pluck("role").where({ user_id: id });
  return user;
}

function getNameByID(id) {
  return db("users").where({ id }).select("name").first();
}
