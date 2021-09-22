const { ObjectId } = require('mongodb');

const { validateProduct } = require('../schemas/productsSchema');
const { findById } = require('../models/productsModel');

const existsImage = (req, res, next) => {
  const file = req.file;
  
  if (!file) return res.status(404).send({ error: "file not found." });
  
  next();
};

const isValidProduct = async (req, res, next) => {
  const { name, ingredients } = req.body;

  const { code, message } = await validateProduct({ name, ingredients });

  if (message) return res.status(code).json({ message });

  next();
};

const existsProductOrIsvalidId = async (req, res, next) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) return res.status(404).json({ message: 'produto não encontrado' });

  const { product } = await findById({ id });

  if (!product) return res.status(404).json({ message: 'produto não encontrado' });

  next();
};

module.exports = {
  existsImage,
  isValidProduct,
  existsProductOrIsvalidId,
};