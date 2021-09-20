const { create } = require('../models/productsModel');

const createProduct = async (req, res) => {
  const { name, urlImage, Ingredients } = req.body;

  const { id } = await create({ name, urlImage, Ingredients });

  return res.status(201).json({ 
    message: 'Produto criado com sucesso',
    id,
  })
};

module.exports = {
  createProduct,
};