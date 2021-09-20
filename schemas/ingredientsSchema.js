const validateIngredient = async ({ name, price, measures, quantity }) => {
  if (!name || !price || !measures || !quantity) {
    return { code: 422, message: 'Verifique ingrediente, existe uma propriedade null' }
  }
  if (typeof price != 'number' || typeof quantity != 'number') {
    return { code: 422, message: 'Verifique, preço e quantidade precisam ser numeros' }
  }
  return {};
};

module.exports = {
  validateIngredient,
};