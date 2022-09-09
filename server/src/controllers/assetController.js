const httpStatus = require("http-status");
const Asset = require("../models/assetModel");
const AWS = require("aws-sdk");
const { path } = require("path");
const fs = require("fs");
const { decode } = require("base64-arraybuffer");
const { upload } = require("../services/aws");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

exports.list = async (req, res, next) => {
  try {
    const assetsList = await Asset.list(req.query);

    res.json({ status: httpStatus.OK, data: assetsList });
  } catch (err) {
    next(err);
  }
};

exports.get = async (req, res, next) => {
  try {
    const { _id } = req.params;

    await Asset.findOne({ _id })
      .then((asset) => {
        res.json({ status: httpStatus.OK, data: asset });
      })
      .catch((err) =>
        res.json({
          status: httpStatus.NOT_FOUND,
          err,
          message: "Asset does not exist.",
        })
      );
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const asset = await new Asset(req.body).save();

    res.json({ status: httpStatus.CREATED, asset });
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const asset = req.body;
    const savedAsset = await Asset.updateOne({ _id }, asset);

    res.json({ status: httpStatus.CREATED, savedAsset });
  } catch (err) {
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const { _id } = req.params;

    await Asset.deleteOne({ _id });

    res.json({
      status: httpStatus.OK,
      message: "Asset deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

exports.upload_image = async (req, res, next) => {
  try {
    const singleUpload = await upload.single("photo");

    singleUpload(req, res, async (err) => {
      if (err) {
        console.log({ err, message: "error in callback" });
      }
      res.send(req.file);
    });
  } catch (err) {
    next(err);
  }
};
