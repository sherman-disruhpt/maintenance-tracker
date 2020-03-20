const moment = require("moment");
const MaintenanceRecord = require("models/maintenanceRecordModel");

const recordEnum = {
  UNIT: "unit",
  COMPLETEDON: "completedOn",
  MAINTENANCETYPE: "maintenanceType",
  CUSTOMTYPE: "customType",
  NEXTDUE: "nextDue",
  SYSTEMENGINEHOURS: "systemEngineHours",
  ACTUALENGINEHOURS: "actualEngineHours",
  ENGINEHOURSNEXTDUE: "engineHoursNextDue",
  CONDUCTEDBY: "conductedBy"
};

exports.newRecord = async (req, res, next) => {
  try {
    const user = res.locals.loggedInUser;

    const {
      unit,
      completedOn,
      maintenanceType,
      customType,
      nextDue,
      actualEngineHours,
      engineHoursNextDue
    } = req.body;

    const newRecord = new MaintenanceRecord({
      unit,
      completedOn: moment(completedOn, "MM-DD-YYYY", true).format(),
      maintenanceType,
      customType,
      nextDue: moment(nextDue, "MM-DD-YYYY", true).format(),
      actualEngineHours,
      engineHoursNextDue,
      conductedBy: user._id,
      conductedByFormat: `${user.firstName} ${user.lastName}`
    });

    await newRecord.save();

    res.status(201).json(newRecord);
  } catch (error) {
    next(error);
  }
};

exports.getRecords = async (req, res, next) => {
  try {
    const query = req.query;
    const names = Object.getOwnPropertyNames(query);
    const fields = Object.values(recordEnum);

    const set = [...new Set([...names, ...fields])];

    if (fields.length !== set.length)
      throw new Error("Invalid search parameter(s)");

    if (query.conductedBy) {
      query.conductedByFormat = query.conductedBy;
      delete query.conductedBy;
    }

    if (query.completedOn) {
      query.completedOn = moment(
        query.completedOn,
        "MM-DD-YYYY",
        true
      ).format();
    }

    if (query.nextDue) {
      query.nextDue = moment(query.nextDue, "MM-DD-YYYY", true).format();
    }

    const records = await MaintenanceRecord.find(query);
    res.status(200).json(records);
  } catch (error) {
    next(error);
  }
};

exports.getRecord = async (req, res, next) => {
  try {
    const recordId = req.params.recordId;
    const record = await MaintenanceRecord.findById(recordId);
    if (!record) return next(new Error("Maintenance Record does not exist"));
    res.status(200).json(record);
  } catch (error) {
    next(error);
  }
};

exports.updateRecord = async (req, res, next) => {
  try {
    const {
      unit,
      completedOn,
      maintenanceType,
      customType,
      nextDue,
      actualEngineHours,
      engineHoursNextDue
    } = req.body;

    const recordId = req.params.recordId;
    await MaintenanceRecord.findByIdAndUpdate(recordId, {
      unit,
      completedOn: moment(completedOn, "MM-DD-YYYY", true).format(),
      maintenanceType,
      customType,
      nextDue: moment(nextDue, "MM-DD-YYYY", true).format(),
      actualEngineHours,
      engineHoursNextDue
    });

    const record = await MaintenanceRecord.findById(recordId);

    res.status(200).json(record);
  } catch (error) {
    next(error);
  }
};

exports.deleteRecord = async (req, res, next) => {
  try {
    const recordId = req.params.recordId;
    await MaintenanceRecord.findByIdAndDelete(recordId);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
