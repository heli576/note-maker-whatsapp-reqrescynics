const mongoose = require("mongoose");

const PsidSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  psid: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model("psids", PsidSchema);
