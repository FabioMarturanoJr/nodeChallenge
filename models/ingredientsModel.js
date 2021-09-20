const mongoConnect = require('./connection');

const create = async ({ name, price, measures, quantity }) => {
  const ingredientCollection = await mongoConnect.getConnection()
    .then((db) => db.collection('ingredients'));

  const { insertedId: id } = await ingredientCollection
    .insertOne({ name, price, measures, quantity });

  return { id };
};

module.exports = {
  create,
};
