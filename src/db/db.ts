const MongoClient = require("mongodb").MongoClient;

let _db = {};

const initDBFile = async () => {
  try {
    //@ts-ignore
    const DB_URL = !global.testing
      ? process.env.DB_URL
      : process.env.DB_URL_TEST;
    console.log("HELLO: ");
    console.log(DB_URL);
    const client = await MongoClient.connect(DB_URL as string, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    if (!client) {
      throw "BIG OUFF";
    }
    //@ts-ignore
    _db = await client.db(global?.staging ? "cfcTest" : "cfc");
    if (_db == {}) throw "NOT CONNECTED";
  } catch (err) {
    console.log("DB TEST ERROR");
    console.log(err);
  }
};

const _getDB = () => {
  return _db;
};

module.exports = {
  initDB: initDBFile,
  getDB: _getDB,
};
