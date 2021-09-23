const { findByEmail } = require('../models/userModel');

// source: https://ui.dev/validate-email-address-javascript/
const emailIsValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const areEmpty = (email, password) => !email || !password;

const validateLogin = async ({ email, password }) => {
  const code = 401;
  const messageFilled = 'todos os campos devem ser preenchidos';
  const messageIncorrect = 'usuário ou senha incorreto';
  const user = await findByEmail({ email });

  if (areEmpty(email, password)) return { code, message: messageFilled };
  if (!user || user.password !== password) return { code, message: messageIncorrect };
  if (!emailIsValid(email)) return { code, message: messageIncorrect };
  return {};
};

module.exports = {
  validateLogin,
};
