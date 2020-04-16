module.exports = {
    collectionName: "orgChangeRequest",
    allowedEntries: [
        {key: "orgID", type: "object"},
        {key: "name", type: "string"},
        {key: "location", type: "string"},
        {key: "email", type: "string"},
        {key: "desc", type: "string"},
        {key: "link", type: "string"},
        {key: "interests", type: "object"},
        {key: "deleteReq", type: "boolean"}
    ]
}