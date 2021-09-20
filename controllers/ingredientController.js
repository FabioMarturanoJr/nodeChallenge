const { create } = require('../models/ingredientsModel')

const createIngredient = async(req, res) => {
  const { name, price, measures, quantity } = req.body;

  const { id } = await create({ name, price, measures, quantity });

  return res.status(201).json({ id })
};

module.exports = {
  createIngredient,
};
