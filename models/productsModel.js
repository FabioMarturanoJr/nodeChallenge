const mongoConnect = require('./connection');
const { ObjectId } = require('mongodb');

const { findById: findIngredient } = require('./ingredientsModel');

const sumPrice = async (ingredients) => {
  let price = 0;

  const toAwait = ingredients.map(async ({ ingredientId: id, quantityUsed}) => {
    const { ingredient: { price: priceIngredient } } = await findIngredient({ id });
    price += (priceIngredient * quantityUsed);
  });

  await Promise.all(toAwait);

  return price;
};

const create = async ({ name, ingredients }) => {
  const productsCollection = await mongoConnect.getConnection()
    .then((db) => db.collection('products'));

  const price = await sumPrice(ingredients);
    
  const { insertedId: id } = await productsCollection
    .insertOne({ name, ingredients, price });

  return { id };
};

const getAll = async () => {
  const productsCollection = await mongoConnect.getConnection()
  .then((db) => db.collection('products'));

  const products = await productsCollection.find().toArray();

  return { products };
};

const findById = async ({ id }) => {
  const productsCollection = await mongoConnect.getConnection()
    .then((db) => db.collection('products'));    

  const product = await productsCollection
    .findOne(new ObjectId(id));
  
    return { product };
};

const update = async ({ id, name, ingredients }) => {
  const productsCollection = await mongoConnect.getConnection()
    .then((db) => db.collection('products'));

  const price = await sumPrice(ingredients);

  await productsCollection
    .updateOne({ _id: new ObjectId(id) }, { $set: { name, ingredients, price } });
};

const addImagePath = async({ id }) => {
  const productsCollection = await mongoConnect.getConnection()
    .then((db) => db.collection('products'));

  const imgPath = `http://localhost:3000/${id}.png`
  await productsCollection
    .updateOne({ _id: new ObjectId(id) }, { $set: { imgPath } });
};

const deleteProd = async ({ id }) => {
  const productsCollection = await mongoConnect.getConnection()
    .then((db) => db.collection('products'));

  const { product } = await findById({ id });

  await productsCollection
    .deleteOne({ _id: new ObjectId(id) });

  return { product };  
};

module.exports = {
  create,
  getAll,
  update,
  deleteProd,
  addImagePath,
};
