const validateProduct = async ({ name, ingredients }) => {
  if (!name || !ingredients) {
    return { code: 422, message: 'Verifique o produto, existe uma propriedade null' }
  }
  if (ingredients.length < 1) {
    return { code: 422, message: 'Verifique, é preciso ter pelomenos um ingrediente no produto' }
  }
  return {};
};

module.exports = {
  validateProduct,
};