const mongoose = require("mongoose")

const schema = mongoose.Schema({
  name: String,
  location: String,
  email: String,
  desc: String,
  link: String
})

module.exports = mongoose.model("organization", schema, "organization")