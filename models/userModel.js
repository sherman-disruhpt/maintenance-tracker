const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: {
    type: String,
    trim: true,
    required: true
  },
  lastName: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: "view",
    enum: [
      "view",
      "search",
      "list",
      "add",
      "update",
      "delete",
      "read-only",
      "write",
      "admin"
    ]
  },
  accessToken: {
    type: String
  },
  isActive: {
    type: Boolean
  }
}, { versionKey: false });

module.exports = mongoose.model('user', UserSchema);
