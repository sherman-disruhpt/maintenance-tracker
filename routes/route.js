const express = require("express");
const router = express.Router();
const auth = require("middleware/auth");
const upload = require("middleware/upload");
const userController = require("controllers/userController");
const recordController = require("controllers/recordController");
const noteController = require("controllers/noteController");
const pictureController = require("controllers/pictureController")

router.post(
  "/users",
  auth.allowIfAuthenticated,
  auth.checkAccess,
  userController.signup
);

router.post("/auth", auth.authenticate);

router.post(
  "/records",
  auth.allowIfAuthenticated,
  auth.checkAccess,
  recordController.newRecord
);

router.post(
  "/records/:recordId/notes",
  auth.allowIfAuthenticated,
  auth.checkAccess,
  noteController.newNote
);
 
 router.post(
  "/records/:recordId/pictures",
  auth.allowIfAuthenticated,
  auth.checkAccess,
  upload,
  pictureController.newPicture
);

router.get(
  "/records",
  auth.allowIfAuthenticated,
  auth.checkAccess,
  recordController.getRecords
);

router.get(
  "/records/:recordId/notes",
  auth.allowIfAuthenticated,
  auth.checkAccess,
  noteController.getNotes
);

router.get(
  "/records/:recordId",
  auth.allowIfAuthenticated,
  auth.checkAccess,
  recordController.getRecord
);

router.put(
  "/records/:recordId",
  auth.allowIfAuthenticated,
  auth.checkAccess,
  recordController.updateRecord
);

router.delete(
  "/records/:recordId",
  auth.allowIfAuthenticated,
  auth.checkAccess,
  recordController.deleteRecord
);





module.exports = router;
