const mongoConnect = require('./connection');
const { ObjectId } = require('mongodb');

const create = async ({ name, price, measures, quantity }) => {
  const ingredientCollection = await mongoConnect.getConnection()
    .then((db) => db.collection('ingredients'));

  const { insertedId: id } = await ingredientCollection
    .insertOne({ name, price, measures, quantity });

  return { id };
};

const getAll = async() => {
  const ingredientCollection = await mongoConnect.getConnection()
  .then((db) => db.collection('ingredients'));

  const ingredients = await ingredientCollection.find().toArray();

  return { ingredients };
};

const findById = async({ id }) => {
  const ingredientCollection = await mongoConnect.getConnection()
  .then((db) => db.collection('ingredients'));

  const ingredient = await ingredientCollection
    .findOne(new ObjectId(id));

  return { ingredient };
};

module.exports = {
  create,
  getAll,
  findById,
};
