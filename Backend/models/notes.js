const mongoose = require("mongoose");

const NoteSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  noteText: {
    type: String,
    required: true
  },
  createdAt: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("notes", NoteSchema);
