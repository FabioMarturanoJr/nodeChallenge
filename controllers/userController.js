const jwt = require('jsonwebtoken');
const { registerUser, findByEmail } = require('../models/userModel');

const secret = 'nodeChallenge';
const jwtConfig = { expiresIn: '25m', algorithm: 'HS256' };

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const { id } = await registerUser({ name, email, password });

  res.status(201).json({ 
    message: 'Novo usuário criado com sucesso',
    user: { id, email } });
};

const login = async (req, res) => {
  const { email } = req.body;

  const { _id, role } = await findByEmail({ email });

  const token = jwt.sign({ data: { id: _id, email, role } }, secret, jwtConfig);

  return res.status(200).json({ token });
};

module.exports = {
  createUser,
  login,
};