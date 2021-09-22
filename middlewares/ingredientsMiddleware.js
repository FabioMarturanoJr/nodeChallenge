const { validateIngredient } = require('../schemas/ingredientsSchema');

const isValidIngredient = async (req, res, next) => {
  const { name, price, measures, quantity } = req.body;

  const { code, message } = await validateIngredient({ name, price, measures, quantity });

  if (message) return res.status(code).json({ message });

  next();
};

module.exports = {
  isValidIngredient,
};