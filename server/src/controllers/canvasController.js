const httpStatus = require("http-status");
const Canvas = require("../models/canvasModel");

exports.list = async (req, res, next) => {
  try {
    console.log({ query: req.query });
    const appointmentsList = await Canvas.list(req.query);

    res.json({ status: httpStatus.OK, data: appointmentsList });
  } catch (err) {
    next(err);
  }
};

exports.get = async (req, res, next) => {
  try {
    const { _id } = req.params;

    await Canvas.findOne({ _id })
      .then((canvas) => {
        res.json({ status: httpStatus.OK, data: canvas });
      })
      .catch((err) =>
        res.json({
          status: httpStatus.NOT_FOUND,
          err,
          message: "Canvas does not exist.",
        })
      );
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const canvas = await new Canvas(req.body).save();

    res.json({ status: httpStatus.CREATED, canvas });
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const canvas = req.body;
    const savedCanvas = await Canvas.updateOne({ _id }, canvas);

    res.json({ status: httpStatus.CREATED, savedCanvas });
  } catch (err) {
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const { _id } = req.params;

    await Canvas.deleteOne({ _id });

    res.json({
      status: httpStatus.OK,
      message: "Canvas deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};
