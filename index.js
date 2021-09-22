const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
let path = require('path');

const { createIngredient, getAllIngredients } = require('./controllers/ingredientController');

const { createProduct, getAllProducts, updateProduct, 
  deleteProduct, addImage, errorImage } = require('./controllers/productsController');

const { isValidIngredient } = require('./middlewares/ingredientsMiddleware');
const { existsImage } = require('./middlewares/productsMiddleware');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

const storage = multer.diskStorage({
  destination: (req, file, call) => {
    return call(null, 'uploads/');
  },
  filename: (req, file, call) => {
    return call(null, `${req.params.id}.png`);
  }
});

const fileFilter = (req, file, call) => {
  if (!file.originalname.match(/\.(png|jpg)$/)){
    call(new Error('Please upload an image PNG or JPG.'), false);
  } else {
    call(undefined, true);
  }
};

const upload = multer({ storage, fileFilter});

app.use(express.static(path.resolve('uploads')));

app.get('/ingredients', getAllIngredients);
app.post('/ingredient', isValidIngredient, createIngredient);

app.get('/products', getAllProducts);
app.post('/product', createProduct);
app.post('/product/upload/:id', upload.single('file'), existsImage, addImage, errorImage);
app.put('/product/:id', updateProduct);
app.delete('/product/:id', deleteProduct);

app.listen(PORT, () => {
  console.log(`Listening port ${PORT}...`);
});
