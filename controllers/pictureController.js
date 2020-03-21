const util = require("util");
const mongodb = require("mongodb");
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

exports.getPicturesMetadata = async (req, res, next) => {
  try {
    const filter = { "metadata.recordId": req.params.recordId };
    const pictures = await Picture.find(filter);
    res.status(200).json(pictures.map(m => m.metadata));
  } catch (error) {
    next(error);
  }
};

exports.getPicture = async (req, res, next) => {
  try {
    const filter = { "metadata._id": req.params.pictureId };
    const picture = (await Picture.findOne(filter)).toObject();

    if (picture) {
      res.setHeader(
        "Content-disposition",
        "attachment; filename=" + picture.filename
      );
      res.setHeader("Content-type", picture.contentType);

      const client = new mongodb.MongoClient(process.env.DB_CONNECTION, {
        useUnifiedTopology: true
      });

      await client.connect();
      const db = client.db(process.env.DB_NAME);
      const bucket = new mongodb.GridFSBucket(db, { bucketName: "pictures" });

      bucket.openDownloadStream(picture._id).pipe(res);
    }

  } catch (error) {
    next(error);
  }
};

exports.deletePicture = async (req, res, next) => {
  try {
    const filter = { "metadata._id": req.params.pictureId };
    const picture = await Picture.findOne(filter);

    if (picture) {
      const client = new mongodb.MongoClient(process.env.DB_CONNECTION, {
        useUnifiedTopology: true
      });

      await client.connect();
      const db = client.db(process.env.DB_NAME);
      const bucket = new mongodb.GridFSBucket(db, { bucketName: "pictures" });
      await bucket.delete(picture._id);
      res.sendStatus(204);
    }

    res.sendStatus(404);
  } catch (error) {
    next(error);
  }
};
