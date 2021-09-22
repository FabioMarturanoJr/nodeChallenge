const existsImage = (req, res, next) => {
  const file = req.file;
  
  if (!file) return res.status(404).send({ error: "file not found." });
  
  next();
};

module.exports = {
  existsImage,
};