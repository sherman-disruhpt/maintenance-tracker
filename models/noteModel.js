const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
  note: {
    type: String,
    required: true
  },
  createdBy: {
    type: String,
    required: true
  },
  timestamp: {
    type: String,
    required: true
  },
}, { versionKey: false });

const Note = mongoose.model('note', NoteSchema);

module.exports = mongoose.model("note", NoteSchema);
