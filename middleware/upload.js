const mongoose = require("mongoose");
const util = require("util");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");

const storage = new GridFsStorage({
  url: process.env.CONNECTION_STRING,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const options = ["image/png", "image/jpeg"];

    if (options.includes(file.mimetype)) {
      const filename = `${Date.now()}-${req.params.recordId}-${
        file.originalname
      }`;

      const _id = mongoose.Types.ObjectId();

      if (!req.photoMetadataIds) {
        req.photoMetadataIds = [_id ];
      } else {
        req.photoMetadataIds = [...req.photoMetadataIds, ...[_id ]];
      }

      return {
        bucketName: "pictures",
        filename: filename,
        metadata: {
          recordId: req.params.recordId,
          _id
        }
      };
    }
  }
});

const upload = multer({ storage: storage }).array("multi-files", 5);
module.exports = util.promisify(upload);
