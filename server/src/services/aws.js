require("dotenv").config();
const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const Storage = multerS3({
  s3,
  bucket: process.env.AWS_BUCKET_NAME,
  acl: "public-read",
  contentType: multerS3.AUTO_CONTENT_TYPE,
  contentDisposition: "inline",
  metadata: function (req, file, cb) {
    cb(null, { filedname: file.fieldname });
  },
  key(req, file, callback) {
    callback(null, file.originalname + ".jpeg");
  },
});

exports.upload = multer({ storage: Storage });
