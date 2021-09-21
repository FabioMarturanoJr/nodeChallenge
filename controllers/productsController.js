const { create } = require('../models/productsModel');

const createProduct = async (req, res) => {
  const { name, ingredients } = req.body;

  const { id } = await create({ name, ingredients });

  return res.status(201).json({ 
    message: 'Produto criado com sucesso',
    id,
  })
};

module.exports = {
  createProduct,
};