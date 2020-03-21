const Picture = require("models/pictureModel");

exports.newPicture = async (req, res, next) => {
  try {
    if (req.files.length <= 0) {
      return res.status(422).send(`You must select at least 1 photo.`);
    }

    for (let _id of req.photoMetadataIds) {
      const filter = { "metadata._id": _id };
      const metadata = {
        metadata: {
          _id,
          recordId: req.params.recordId,
          caption: req.body.caption
        }
      };
      await Picture.findOneAndUpdate(filter, metadata);
    }

    return res.status(201).send(`Photos have been uploaded.`);
  } catch (error) {
    next(error);
  }
};
