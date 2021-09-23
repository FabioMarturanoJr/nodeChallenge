const { findById: findIngredient } = require('../models/ingredientsModel');
const { findById } = require('../models/productsModel');

const validateProduct = async ({ name, ingredients }) => {
  if (!name || !ingredients) {
    return { code: 422, message: 'Verifique o produto, existe uma propriedade null' }
  }
  if (ingredients.length < 1) {
    return { code: 422, message: 'Verifique, é preciso ter pelomenos um ingrediente no produto' }
  }
  return {};
};

const cantBesold = async ({ id: idProduct, ingredients }) => {
  const stocks = [];

  const { product: { ingredients: ingredientesBeforeUpdate } } = await findById({ id: idProduct });

  const toAwait = ingredients.map(async ({ ingredientId: id, quantityUsed}) => {
    const { quantityUsed: quantityUsedBefore } = ingredientesBeforeUpdate.find(({ ingredientId }) => id == ingredientId);
    const { ingredient: { quantity } } = await findIngredient({ id });
    stocks.push((quantityUsedBefore + quantity - quantityUsed) < 0);
  });

  await Promise.all(toAwait);

  const nagativeStock = stocks.some((stock) => stock);

  return nagativeStock;
};

const CheckstockIngredientes = async ({ ingredients }) => {
  const stocks = [];

  const toAwait = ingredients.map(async ({ ingredientId: id }) => {
    const { ingredient: { quantity } } = await findIngredient({ id });
    stocks.push(quantity > 0);
  });

  await Promise.all(toAwait);

  const zeroStock = stocks.some((stock) => stock);

  return zeroStock;
};

module.exports = {
  validateProduct,
  cantBesold,
  CheckstockIngredientes,
};
