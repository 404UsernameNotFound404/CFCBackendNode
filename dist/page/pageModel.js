"use strict";
module.exports = {
    collectionName: "activist",
    allowedEntries: [
        { key: "id", type: "number" },
        { key: "type", type: "number" },
        { key: "sections", type: "object" }
    ],
    isArray: true
};
