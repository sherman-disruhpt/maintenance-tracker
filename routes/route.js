const express = require("express");
const router = express.Router();
const auth = require("middleware/auth");
const userController = require("controllers/userController");
const recordController = require("controllers/recordController");

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

router.get(
  "/records",
  auth.allowIfAuthenticated,
  auth.checkAccess,
  recordController.getRecords
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
