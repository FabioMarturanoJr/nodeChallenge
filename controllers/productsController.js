const { create, getAll, update, deleteProd, addImagePath } = require('../models/productsModel');

const createProduct = async (req, res) => {
  const { name, ingredients } = req.body;

  const { id } = await create({ name, ingredients });

  return res.status(201).json({ 
    message: 'Produto criado com sucesso',
    id,
  })
};

const getAllProducts = async (req, res) => {
  const { products } = await getAll();

  return res.status(200).json({ products });
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, ingredients } = req.body;

  await update({ id, name, ingredients });
 
  return res.status(200).json({ message: "produto atualizado com sucesso" });
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const { product } = await deleteProd({ id });

  return res.status(200).json({ message: 'Produto deletado com sucesso', product });
};

const addImage = async (req, res) => {
  const { id } = req.params;
 
  await addImagePath({ id });

  return res.status(201).json({ message: "Arquivo salvo com sucesso" });
};

const errorImage = (error, req, res, next) => {
  return res.status(400).send({ error: error.message });
};

module.exports = {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  addImage,
  errorImage,
};
