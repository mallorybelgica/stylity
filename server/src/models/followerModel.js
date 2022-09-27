require("dotenv").config();
const mongoose = require("mongoose");

const followerSchema = mongoose.Schema(
  {
    follower_id: {
      type: String,
      required: true,
    },
    followee_id: {
      type: String,
      required: true,
    },
    timestamp: {
      type: String,
      required: true,
    },
  },
  { collection: "followers" }
);

followerSchema.statics.list = async function (query) {
  try {
    const followers = await this.find(query).exec();

    return followers;
  } catch (err) {
    throw error({ err });
  }
};

const follower = mongoose.model("follower", followerSchema);

module.exports = follower;
