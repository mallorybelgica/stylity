require("dotenv").config();
const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    comment: {
      type: String,
      required: false,
    },
    author_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    pid: {
      type: String,
      required: true,
    },
    likes: {
      type: Array,
      default: [],
    },
    pid: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    createdAt: {
      type: String,
      required: true,
    },
  },
  { collection: "comments" }
);

commentSchema.statics.list = async function (query) {
  try {
    const comments = await this.find(query).exec();

    return comments;
  } catch (err) {
    throw error({ err });
  }
};

const comment = mongoose.model("comment", commentSchema);

module.exports = comment;
