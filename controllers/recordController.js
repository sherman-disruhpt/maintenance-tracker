const MaintenanceRecord = require("models/maintenanceRecordModel");

function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}

function hasInvalidKey(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}

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
      completedOn,
      maintenanceType,
      customType,
      nextDue,
      actualEngineHours,
      engineHoursNextDue,
      conductedBy: user._id
    });

    await newRecord.save();

    res.status(201).json(newRecord);
  } catch (error) {
    next(error);
  }
};

exports.getRecords = async (req, res, next) => {
  let records;

  if (isEmpty(req.query)) {
    records = await MaintenanceRecord.find({});
  } else {
      const names = Object.getOwnPropertyNames(req.query);
    const {
      unit,
      completedOn,
      maintenanceType,
      nextDue,
      customType,
      actualEngineHours,
      engineHoursNextDue
    } = req.query;

    records = await MaintenanceRecord.find({
      unit,completedOn
    });
  }
  res.status(200).json(records);
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
      completedOn,
      maintenanceType,
      customType,
      nextDue,
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
