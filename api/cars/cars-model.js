const db = require('../../data/db-config');

const getAll = () => {
  console.log("in the get all")
  return db("cars")
}

const getById = (id) => {
  return db("cars").where("id", id).first()
  // .first() gives us just the object ... not in an array [{}]
}

const create = async (newCar) => {
  const [id] = await db("cars").insert(newCar);
  return getById(id)
}

module.exports = {
  getAll,
  getById,
  create
};