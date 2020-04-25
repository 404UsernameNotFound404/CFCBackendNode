"use strict";
module.exports = {
    collectionName: "userVerificationCode",
    allowedEntries: [
        { key: "key", type: "string" },
        { key: "userID", type: "object" }
    ],
    isArray: false
};
