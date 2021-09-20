const express = require('express');
const bodyParser = require('body-parser');

const { createIngredient } = require('./controllers/ingredientController');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.post('/ingredients', createIngredient);

app.listen(PORT, () => {
  console.log(`Listening port ${PORT}...`);
});
