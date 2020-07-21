"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const MongoClient = require("mongodb").MongoClient;
let _db = {};
const initDBFile = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(process.env.DB_URL);
    const client = new MongoClient(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    yield client.connect((err, client) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            console.log("BIG ERROR");
            console.error(err);
            return;
        }
        console.log("THIS SHOULD BE RUNNING");
        console.log(client);
        //@ts-ignore
        _db = client.db(global.testing ? "cfcTest" : "cfc");
    }));
});
const _getDB = () => {
    return _db;
};
module.exports = {
    initDB: initDBFile,
    getDB: _getDB,
};
