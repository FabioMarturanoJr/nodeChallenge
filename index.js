const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

const { createIngredient, getAllIngredients } = require('./controllers/ingredientController');
const { createProduct, getAllProducts, updateProduct, 
  deleteProduct, addImage, canBesold, errorImage } = require('./controllers/productsController');
const { createUser, login } = require('./controllers/userController')

const { isValidIngredient } = require('./middlewares/ingredientsMiddleware');
const { existsImage, isValidProduct, existsProductOrIsvalidId, checkStockCreate, checkStockUpdate } = require('./middlewares/productsMiddleware');
const { isValidUser } = require('./middlewares/userMiddleware');
const { isValidLogin } = require('./middlewares/loginMiddleware');

const { validateJWT } = require('./auth/validateJWT');

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

const upload = multer({ storage, fileFilter });

app.use(express.static(path.resolve('uploads')));

app.post('/users', isValidUser, createUser);

app.post('/login', isValidLogin, login);

app.get('/ingredients', getAllIngredients);
app.post('/ingredient', validateJWT, isValidIngredient, createIngredient);

app.get('/products', getAllProducts);
app.get('/product/:id', canBesold);
app.post('/product', validateJWT, isValidProduct, checkStockCreate, createProduct);
app.post('/product/upload/:id', validateJWT, existsProductOrIsvalidId, upload.single('file'), existsImage, addImage, errorImage);
app.put('/product/:id', validateJWT, existsProductOrIsvalidId, checkStockUpdate, updateProduct);
app.delete('/product/:id', validateJWT, existsProductOrIsvalidId, deleteProduct);

app.listen(PORT, () => {
  console.log(`Listening port ${PORT}...`);
});
