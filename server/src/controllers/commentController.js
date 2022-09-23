const httpStatus = require("http-status");
const Comment = require("../models/commentModel");

exports.list = async (req, res, next) => {
  try {
    const commentsList = await Comment.list(req.query);

    res.json({ status: httpStatus.OK, data: commentsList });
  } catch (err) {
    next(err);
  }
};

exports.get = async (req, res, next) => {
  try {
    const { _id } = req.params;

    await Comment.findOne({ _id })
      .then((comment) => {
        res.json({ status: httpStatus.OK, data: comment });
      })
      .catch((err) =>
        res.json({
          status: httpStatus.NOT_FOUND,
          err,
          message: "Comment does not exist.",
        })
      );
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const comment = await new Comment(req.body).save();
    console.log({ res, comment });
    res.json({ status: httpStatus.CREATED, comment });
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const comment = req.body;
    const savedComment = await Comment.updateOne({ _id }, comment);

    res.json({ status: httpStatus.CREATED, savedComment });
  } catch (err) {
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const { _id } = req.params;

    await Comment.deleteOne({ _id });

    res.json({
      status: httpStatus.OK,
      message: "Comment deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};
