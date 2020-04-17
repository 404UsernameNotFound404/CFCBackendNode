"use strict";
module.exports = {
    collectionName: "organization",
    allowedEntries: [
        { key: "name", type: "string" },
        { key: "location", type: "string" },
        { key: "email", type: "string" },
        { key: "desc", type: "string" },
        { key: "link", type: "string" },
        { key: "interests", type: "object" },
        { key: "pageID", type: "string" }
    ],
    isArray: false
};
