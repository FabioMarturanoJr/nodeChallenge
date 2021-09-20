const { MongoClient } = require('mongodb');

const MONGO_DB_URL = 'mongodb://localhost:27017';
const DB_NAME = 'nodeChallenge';

let schema = null;

const getConnection = async () => {
  if (schema) return Promise.resolve(schema);
  return MongoClient
    .connect(MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((conn) => conn.db(DB_NAME))
    .then((dbSchema) => {
      schema = dbSchema;
      return schema;
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { getConnection };
