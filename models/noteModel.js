const moment = require("moment");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
  recordId:{
    type: String,
    required: true
  },
  note: {
    type: String,
    required: true
  },
  createdBy: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    required: true
  },
}, {
    toJSON: {
      transform: (doc, ret) => {
        ret.timestamp = moment(ret.timestamp,'MM-DD-YYYY', true).format();
        delete ret._id;
        delete ret.__v;
        return ret;
      }
    }
  });

module.exports = mongoose.model("note", NoteSchema);
