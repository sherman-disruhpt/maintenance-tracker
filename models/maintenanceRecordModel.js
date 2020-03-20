const mongoose = require("mongoose");
const Note = require("models/noteModel");
const Picture = require("models/pictureModel");
const moment = require("moment");
const Schema = mongoose.Schema;

const MaintenanceRecordSchema = new Schema(
  {
    unit: {
      type: String,
      required: true
    },
    completedOn: {
      type: Date,
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
      type: Date,
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
    conductedByFormat: {
      type: String
    },
    conductedBy: {
      type: String
    }
  },
  {
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id;
        ret.completedOn = moment(ret.completedOn,'MM-DD-YYYY', true).format();
        ret.nextDue = moment(ret.nextDue,'MM-DD-YYYY', true).format();
        ret.systemEngineHours = parseFloat(ret.systemEngineHours);
        ret.actualEngineHours = parseFloat(ret.actualEngineHours);
        ret.engineHoursNextDue = parseFloat(ret.engineHoursNextDue);
        ret.conductedBy = ret.conductedByFormat;
        delete ret.__v;
        delete ret.conductedByFormat;
        delete ret._id;
        return ret;
      }
    }
  }
);


module.exports = mongoose.model(
  "maintenanceRecord",
  MaintenanceRecordSchema
);
