const { validateLogin } = require('../schemas/loginSchemas');

const isValidLogin = async (req, res, next) => {
  const { email, password } = req.body;

  const { code, message } = await validateLogin({ email, password });

  if (message) return res.status(code).json({ message });

  next();
};

module.exports = {
  isValidLogin,
};