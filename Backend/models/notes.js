const mongoose = require("mongoose");
//const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;
const noteSchema = new mongoose.Schema({
  noteText: {
    type: String,
    required: true
  },
  user: {
    type: ObjectId, 
    ref: "User"
  },
  source: {
    type: String,
    required: true
  },
  isAttachment: {
    type: String,
    required: true
  }
},
  { timestamps: true }
);

module.exports = mongoose.model("Note", noteSchema);
