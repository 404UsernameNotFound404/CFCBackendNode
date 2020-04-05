const model = require("./model");
const getDB = require('./db').getDB;

//how this works is I pass in the collection name and the list of acceptable entries for the document
//this is because with a non-relation DB the user could potential pass me a body with any matter of data
//and it would be added to document

//TYPES:
type Section = {
    
}

module.exports = {
    user: new model("users", getDB, [
        { key: "name", type: "string" },
        { key: "email", type: "string" },
        { key: "password", type: "string" },
        { key: "phoneNumber", type: "string" },
        { key: "pageID", type: "object" },
        { key: "type", type: "number" },
        { key: "verified", type: "boolean" },
        { key: "image", type: "string" },
        { key: "teamMember", type: "boolean" },
        { key: "isPublic", type: "boolean" },
        { key: "location", type: "string" },
        { key: "desc", type: "string" },
        { key: "interests",  type: "object" }
    ]),
    activist: new model("activist", getDB, [
        {key: "id", type: "number"},
        {key: "type", type: "number"},
        {key: "sections", type: "object"}
    ]),
    organization: new model("organization", getDB, [
        {key: "name", type: "string"},
        {key: "location", type: "string"},
        {key: "email", type: "string"},
        {key: "desc", type: "string"},
        {key: "link", type: "string"},
        {key: "interests", type: "object"},
    ]),
    orgChangeRequest: new model("orgChangeRequest", getDB, [
        {key: "orgID", type: "object"},
        {key: "name", type: "string"},
        {key: "location", type: "string"},
        {key: "email", type: "string"},
        {key: "desc", type: "string"},
        {key: "link", type: "string"},
        {key: "interests", type: "object"},
        {key: "deleteReq", type: "boolean"}
    ]),
}
// ["name", "email", "password", "phoneNumber", "pageID", "type", "verified", "image", "teamMember", "isPublic", "location"]