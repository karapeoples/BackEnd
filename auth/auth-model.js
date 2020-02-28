const db = require("../database/dbConfig");

module.exports = {
  addUser,
  addUserByType,
  find,
  findBy,
  findById,
  findTypeBy,
  findTypeById
};

function find() {
  return db("users");
}

function findById(id) {
  return db("users")
    .where({ id })
    .first();
}

function findBy(filter) {
  return db("users")
    .where(filter)
    .first();
}

function findTypeBy(filter, type) {
  return db(type)
    .where(filter)
    .first();
}

function findTypeById(id, type) {
  return db(type)
    .where({ id })
    .first();
}

async function addUser(user) {
  const [id] = await db("users").insert(user);

  return findById(id);
}

// function addUser(user) {
//   return db("users").insert(user);
// }

async function addUserByType(user, type) {
  console.log(type);
  const [id] = await db(type)
    .insert(user)
    .returning("id");

  console.log("id", id);

  return db(type)
    .where({ id })
    .first();
}
