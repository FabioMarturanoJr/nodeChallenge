const { ObjectId } = require('mongodb');

const { validateProduct, cantBesold } = require('../schemas/productsSchema');
const { findById: findIngredient } = require('../models/ingredientsModel');
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

const checkStockCreate = async (req, res, next) => {
  const { ingredients } = req.body;
  const stocks = [];

  const toAwait = ingredients.map(async ({ ingredientId: id, quantityUsed}) => {
    const { ingredient: { quantity } } = await findIngredient({ id });
    stocks.push((quantity - quantityUsed) < 0);
  });

  await Promise.all(toAwait);

  const nagativeStoke = stocks.some((stock) => stock);
  if (nagativeStoke) return res.status(402).json({ message: 'verifique a quantidade dos ingredientes em estoque' });

  next();
};


const checkStockUpdate = async (req, res, next) => {
  const { id } = req.params;
  const { ingredients } = req.body;

  if (await cantBesold({ id, ingredients })) return res.status(402).json({ message: 'verifique a quantidade dos ingredientes em estoque' });

  next();
};

module.exports = {
  existsImage,
  isValidProduct,
  existsProductOrIsvalidId,
  checkStockCreate,
  checkStockUpdate,
};