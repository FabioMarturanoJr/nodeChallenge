const mongoConnect = require('./connection');

const create = async ({ name, urlImage, Ingredients }) => {
  const productsCollection = await mongoConnect.getConnection()
    .then((db) => db.collection('products'));

  const { insertedId: id } = await productsCollection
    .insertOne({ name, urlImage, Ingredients });

  return { id };
};

module.exports = {
  create,
};