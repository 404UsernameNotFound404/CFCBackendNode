"use strict";
module.exports = {
    collectionName: "users",
    allowedEntries: [
        { key: "name", type: "string" },
        { key: "email", type: "string" },
        { key: "password", type: "string" },
        { key: "phoneNumber", type: "string" },
        { key: "pageID", type: "object" },
        { key: "verified", type: "boolean" },
        { key: "image", type: "string" },
        { key: "teamMember", type: "boolean" },
        { key: "isPublic", type: "boolean" },
        { key: "location", type: "string" },
        { key: "interests", type: "object" }
    ],
    isArray: false
};
