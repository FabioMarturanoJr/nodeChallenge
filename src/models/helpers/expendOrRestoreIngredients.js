const { findById, updateQuantity } = require('../ingredientsModel');

const expendQuantIngredients = async ({ ingredients }) => {
  const toAwait = ingredients.map(async ({ ingredientId: id, quantityUsed }) => {
    const { ingredient } = await findById({ id });
    await updateQuantity({ id, quantity: ingredient.quantity - quantityUsed });
  });

  await Promise.all(toAwait)
};

const restoreQuantIngredients = async ({ ingredients }) => {
  const toAwait = ingredients.map(async ({ ingredientId: id, quantityUsed }) => {
    const { ingredient } = await findById({ id });
    await updateQuantity({ id, quantity: ingredient.quantity + quantityUsed });
  });

  await Promise.all(toAwait);
};

module.exports = {
  expendQuantIngredients,
  restoreQuantIngredients,
};