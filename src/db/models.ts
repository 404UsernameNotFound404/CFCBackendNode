const model = require("./model");
const getDB = require('./db').getDB;
const userModel = require('../user/userModel');
const page = require("../page/pageModel");
const organizationModel = require("../organization/organizationModel");
const orgChangeRequestModel = require('../organization/orgChangeRequestModel');

//how this works is I pass in the collection name and the list of acceptable entries for the document
//this is because with a non-relation DB the user could potential pass me a body with any matter of data
//and it would be added to document

module.exports = {
    user: new model(userModel.collectionName, getDB, userModel.allowedEntries, userModel.isArray),
    page: new model(page.collectionName, getDB, page.allowedEntries, page.isArray),
    organization: new model(organizationModel.collectionName, getDB, organizationModel.allowedEntries, organizationModel.isArray),
    orgChangeRequest: new model(orgChangeRequestModel.collectionName, getDB, orgChangeRequestModel.allowedEntries, orgChangeRequestModel.isArray)
}
// ["name", "email", "password", "phoneNumber", "pageID", "type", "verified", "image", "teamMember", "isPublic", "location"]