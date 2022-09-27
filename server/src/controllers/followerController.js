const httpStatus = require("http-status");
const Follower = require("../models/followerModel");

exports.list = async (req, res, next) => {
  try {
    const followersList = await Follower.list(req.query);

    res.json({ status: httpStatus.OK, data: followersList });
  } catch (err) {
    next(err);
  }
};

exports.get = async (req, res, next) => {
  try {
    const { _id } = req.params;

    await Follower.findOne({ _id })
      .then((follower) => {
        res.json({ status: httpStatus.OK, data: follower });
      })
      .catch((err) =>
        res.json({
          status: httpStatus.NOT_FOUND,
          err,
          message: "Follower does not exist.",
        })
      );
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const follower = await new Follower(req.body).save();

    res.json({ status: httpStatus.CREATED, follower });
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const follower = req.body;
    const savedFollower = await Follower.updateOne({ _id }, follower);

    res.json({ status: httpStatus.CREATED, savedFollower });
  } catch (err) {
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const { _id } = req.params;

    await Follower.deleteOne({ _id });

    res.json({
      status: httpStatus.OK,
      message: "Follower deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};
