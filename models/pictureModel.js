const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PictureSchema = new Schema({
  recordId: {
    type: String,
    required: true
  },
  img: {
    data: Buffer,
    contentType: String
  },
  caption: {
    type: String
  }
}, { versionKey: false });
const Picture = mongoose.model('picture', PictureSchema);

module.exports = Picture;
