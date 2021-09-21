const mongoConnect = require('./connection');

const { findById: findIngredient } = require('./ingredientsModel');

const create = async ({ name, ingredients }) => {
  let price = 0;

  const productsCollection = await mongoConnect.getConnection()
    .then((db) => db.collection('products'));

  const toAwait = ingredients.map(async ({ ingredientId: id, quantityUsed}) => {
    const { ingredient: { price: priceIngredient } } = await findIngredient({ id });
    price += (priceIngredient * quantityUsed);
  });

  await Promise.all(toAwait);
    
  const { insertedId: id } = await productsCollection
    .insertOne({ name, ingredients, price });

  return { id };
};


module.exports = {
  create,
};
