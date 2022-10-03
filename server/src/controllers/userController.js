const httpStatus = require("http-status");
const User = require("../models/userModel");
const { ROLES } = require("../utils/global");

exports.list = async (req, res, next) => {
  try {
    const usersList = await User.list(req.query);

    const transformedUsersList = usersList.map((user) => {
      return user.transform();
    });

    res.json({ status: httpStatus.OK, data: transformedUsersList });
  } catch (err) {
    next(err);
  }
};

exports.search = async (req, res, next) => {
  try {
    const { searchValue } = req.query;

    const usersList = await User.search(searchValue);

    const transformedUsersList = usersList.map((user) => {
      return user.transform();
    });

    res.json({ status: httpStatus.OK, data: transformedUsersList });
  } catch (err) {
    next(err);
  }
};

exports.get = async (req, res, next) => {
  try {
    const { _id } = req.params;

    await User.findOne({ _id })
      .then((user) => {
        const transformedUser = user.transform();
        res.json({ status: httpStatus.OK, data: transformedUser });
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
    const userData = req.body;
    const savedUser = await User.updateOne({ _id }, { $set: userData });

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

exports.updatePassword = async (req, res, next) => {
  try {
    const { _id, current_password, new_password } = req.body;

    const user = await User.findOne({ _id });
    if (user) {
      if (await user.passwordMatches(current_password)) {
        await User.updateOne(
          { _id },
          { $set: { password: new_password } }
        ).updateOne();

        return res.json({
          status: httpStatus.OK,
          message: "Password successfully updated.",
        });
      } else {
        return res.status(403).json({
          status: httpStatus.FORBIDDEN,
          message: "The password you entered is incorrect.",
        });
      }
    } else {
      return res.status(404).json({
        status: httpStatus.NOT_FOUND,
        message: "User does not exist.",
      });
    }
  } catch (err) {
    return res.status(err.status).json({
      message: err.message,
    });
  }
};
