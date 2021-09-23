const { validateUser } = require('../schemas/userSchemas');

const isValidUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  const { code, message } = await validateUser({ name, email, password });

  if (message) return res.status(code).json({ message });

  next();
};

module.exports = {
  isValidUser,
};