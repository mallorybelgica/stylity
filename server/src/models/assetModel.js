require("dotenv").config();
const mongoose = require("mongoose");

const assetSchema = mongoose.Schema(
  {
    owner_id: {
      type: String,
      required: true,
    },
    owner_type: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    createdAt: {
      type: String,
      required: true,
    },
  },
  { collection: "assets" }
);

assetSchema.statics.list = async function (query) {
  try {
    const assets = await this.find(query).exec();

    return assets;
  } catch (err) {
    throw error({ err });
  }
};

const canvas = mongoose.model("assets", assetSchema);

module.exports = canvas;
