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
}, {
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      }
    }
  });

const PictureSchema = new Schema({
  metadata: MetadataSchema
}, { versionKey: false });


module.exports = mongoose.model('picture', PictureSchema, 'pictures.files');
