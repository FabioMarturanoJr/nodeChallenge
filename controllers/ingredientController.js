const { create, getAll } = require('../models/ingredientsModel')

const createIngredient = async(req, res) => {
  const { name, price, measures, quantity } = req.body;

  const { id } = await create({ name, price, measures, quantity });

  return res.status(201).json({ id })
};

const getAllIngredients = async(req, res) => {
  const { ingredients } = await getAll();

  return res.status(200).json(ingredients);
};

module.exports = {
  createIngredient,
  getAllIngredients,
};
