module.exports = {
    collectionName: "users",
    allowedEntries: [
        { key: "name", type: "string" },
        { key: "email", type: "string" },
        { key: "password", type: "string" },
        { key: "phoneNumber", type: "string", default: "" },
        { key: "pageID", type: "object", default: {} },
        { key: "verified", type: "boolean", default: false },
        { key: "image", type: "string", default: "" },
        { key: "teamMember", type: "boolean", default: false },
        { key: "isPublic", type: "boolean", default: false },
        { key: "location", type: "string", default: "" },
        { key: "interests",  type: "object", default: [] }
    ],
    isArray: false
}