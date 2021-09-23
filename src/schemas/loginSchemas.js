const { findByEmail } = require('../models/userModel');

// source: https://ui.dev/validate-email-address-javascript/
const emailIsValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const areEmpty = (email, password) => !email || !password;

const validateLogin = async ({ email, password }) => {
  const code = 401;
  const messageFilled = 'All fields must be filled';
  const messageIncorrect = 'Incorrect username or password';
  const user = await findByEmail({ email });

  if (areEmpty(email, password)) return { code, message: messageFilled };
  if (!user || user.password !== password) return { code, message: messageIncorrect };
  if (!emailIsValid(email)) return { code: 409, message: messageIncorrect };
  return {};
};

module.exports = {
  validateLogin,
};
