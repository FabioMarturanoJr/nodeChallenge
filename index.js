const express = require('express');
const bodyParser = require('body-parser');

const { createIngredient, getAllIngredients } = require('./controllers/ingredientController');
const { createProduct, getAllProducts, updateProduct, deleteProduct } = require('./controllers/productsController');

const { isValidIngredient } = require('./middlewares/ingredientsMiddleware');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.get('/ingredients', getAllIngredients);
app.post('/ingredient', isValidIngredient, createIngredient);

app.get('/products', getAllProducts);
app.post('/product', createProduct);
app.put('/product/:id', updateProduct);
app.delete('/product/:id', deleteProduct);
// adicionar o multer criando uma rota para as imagens

app.listen(PORT, () => {
  console.log(`Listening port ${PORT}...`);
});
