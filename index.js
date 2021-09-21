const express = require('express');
const bodyParser = require('body-parser');

const { createIngredient, getAllIngredients } = require('./controllers/ingredientController');
const { createProduct } = require('./controllers/productsController');

const { isValidIngredient } = require('./middlewares/ingredientsMiddleware');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.get('/ingredients', getAllIngredients);
app.post('/ingredient', isValidIngredient, createIngredient);

// adicionar o multer criando uma rota para as imagens
app.post('/product', createProduct);

app.listen(PORT, () => {
  console.log(`Listening port ${PORT}...`);
});
