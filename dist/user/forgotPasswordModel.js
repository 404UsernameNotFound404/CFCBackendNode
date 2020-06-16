"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model = require("../db/model");
const getDB = require('../db/db').getDB;
const values = {
    collectionName: "userForgotPassword",
    allowedEntries: [
        { key: "key", type: "string" },
        { key: "userEmail", type: "string" }
    ],
    isArray: false
};
module.exports = new model(values.collectionName, getDB, values.allowedEntries, values.isArray);
