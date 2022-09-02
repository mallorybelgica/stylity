const httpStatus = require("http-status");
const User = require("../models/userModel");

exports.list = async (req, res, next) => {
  try {
    const usersList = await User.list(req.query);

    res.json({ status: httpStatus.OK, data: usersList });
  } catch (err) {
    next(err);
  }
};

exports.get = async (req, res, next) => {
  try {
    const { _id } = req.params;

    await User.findOne({ _id })
      .then((user) => {
        res.json({ status: httpStatus.OK, data: user });
      })
      .catch((err) =>
        res.json({
          status: httpStatus.NOT_FOUND,
          err,
          message: "User does not exist.",
        })
      );
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const user = await new User(req.body).save();

    res.json({ status: httpStatus.CREATED, user });
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const user = req.body;
    const savedUser = await User.updateOne({ _id }, user);

    res.json({ status: httpStatus.CREATED, savedUser });
  } catch (err) {
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const { _id } = req.params;

    await User.deleteOne({ _id });

    res.json({
      status: httpStatus.OK,
      message: "User deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};
