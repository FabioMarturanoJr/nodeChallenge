const { create, getAll, update, deleteProd, addImagePath, findById } = require('../models/productsModel');
const { CheckstockIngredientes } = require('../schemas/productsSchema');

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

const canSell = async (req, res) => {
  const { id } = req.params;

  const { product: { ingredients } } = await findById({ id });

  if (await CheckstockIngredientes({ ingredients })) return res.status(200).json({ message: 'produto pode ser vendido' });

  return res.status(422).json({ message: 'produto não pode ser vendido' });
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
  canSell,
  errorImage,
};
