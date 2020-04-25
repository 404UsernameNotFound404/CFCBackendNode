const MongoClient = require('mongodb').MongoClient;

let _db = {} as any;

const initDBFile = async () => {
    console.log(process.env.DB_URL)
    const client = new MongoClient(process.env.DB_URL as string, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect(async (err: any, client: any) => {
        if (err) {
            console.log("BIG ERROR");
            console.error(err)
            return
        }
        _db = client.db("cfc");
    })
};

const _getDB = () => {
    return _db;
}

module.exports = {
    initDB: initDBFile,
    getDB: _getDB
}