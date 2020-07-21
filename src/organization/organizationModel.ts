const model = require("./model");
const getDB = require("./db").getDB;

const modelData = {
  collectionName: "organization",
  allowedEntries: {
    name: {
      type: "string",
    },
    location: {
      type: "string",
    },
    email: {
      type: "string",
    },
    desc: {
      type: "string",
    },
    link: {
      type: "string",
    },
    interests: {
      type: "number",
      isArray: true,
    },
  },
  isArray: false,
};

export default new model(
  modelData.collectionName,
  getDB,
  modelData.allowedEntries,
  modelData.isArray
);
/*
 allowedEntries: [
    { key: "name", type: "string" },
    { key: "location", type: "string" },
    { key: "email", type: "string" },
    { key: "desc", type: "string" },
    { key: "link", type: "string" },
    { key: "interests", type: "object" },
    { key: "pageID", type: "string" },
  ],
*/
