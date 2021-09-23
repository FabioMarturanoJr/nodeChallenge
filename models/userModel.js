const mongoConnect = require('./connection');

const registerUser = async ({ name, email, password }) => {
  const userCollection = await mongoConnect.getConnection()
    .then((db) => db.collection('users'));
  const role = 'user';

  const { insertedId: id } = await userCollection.insertOne({ name, email, password, role });
  
  return { id };
};

const findByEmail = async ({ email }) => {
  const userCollection = await mongoConnect.getConnection()
    .then((db) => db.collection('users'));

  const user = await userCollection.findOne({ email });

  return user;
};

module.exports = { 
  registerUser,
  findByEmail,
};
