const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MetadataSchema = new Schema({
  recordId: {
    type: String,
    required: true
  },
  caption: {
    type: String
  }
}, { versionKey: false });

const PictureSchema = new Schema({
  metadata: MetadataSchema
}, { versionKey: false });


module.exports = mongoose.model('picture', PictureSchema, 'pictures.files');
