const mongoose = require("mongoose");
const Note = require("models/noteModel");
const Picture = require("models/pictureModel");
const Schema = mongoose.Schema;

const MaintenanceRecordSchema = new Schema({
  unit: {
    type: String,
    required: true
  },
  completedOn: {
    type: String,
    required: true
  },
  maintenanceType: {
    type: String,
    required: true
  },
  customType: {
    type: String
  },
  nextDue: {
    type: String,
    required: true
  },
  systemEngineHours: {
    type: mongoose.Schema.Types.Decimal
  },
  actualEngineHours: {
    type: mongoose.Schema.Types.Decimal
  },
  engineHoursNextDue: {
    type: mongoose.Schema.Types.Decimal
  },
  conductedBy: {
    type: String
  }
}, { versionKey: false });
const MaintenanceRecord = mongoose.model('maintenanceRecord', MaintenanceRecordSchema);

module.exports = MaintenanceRecord;
