require("dotenv").config();
const mongoose = require("mongoose");

const canvasSchema = mongoose.Schema(
  {
    caption: {
      type: String,
      required: false,
    },
    elements: {
      type: Array,
      default: [],
    },
    likes: {
      type: Array,
      default: [],
    },
    comments_off: {
      type: Boolean,
      default: false,
    },
    screenshot: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
    background_color: {
      type: String,
      required: true,
    },
    createdAt: {
      type: String,
      required: true,
    },
  },
  { collection: "canvases" }
);

canvasSchema.statics.list = async function (query) {
  try {
    const canvases = await this.find(query).exec();

    return canvases;
  } catch (err) {
    throw console.error({ err });
  }
};

const canvas = mongoose.model("canvases", canvasSchema);

module.exports = canvas;
