const moment = require("moment");
const Note = require("models/noteModel");

const noteEnum = {
  CREATEDBY: "createdBy",
  TIMESTAMP: "timestamp"
};

exports.newNote = async (req, res, next) => {
  try {
    const user = res.locals.loggedInUser;
    const recordId = req.params.recordId;
    const { note } = req.body;

    const newNote = new Note({
      recordId,
      note,
      timestamp: moment().format(),
      createdBy: `${user.firstName} ${user.lastName}`
    });

    await newNote.save();

    res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
};

exports.getNotes = async (req, res, next) => {
  try {
    const recordId = req.params.recordId;
    const query = req.query;

    const names = Object.getOwnPropertyNames(query);
    const fields = Object.values(noteEnum);

    const set = [...new Set([...names, ...fields])];

    if (fields.length !== set.length)
      throw new Error("Invalid search parameter(s)");

    query.recordId = recordId;

    if (query.timestamp) {
      query.timestamp = moment(query.timestamp, "MM-DD-YYYY", true).format();
    }

    const notes = await Note.find(query);
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};
