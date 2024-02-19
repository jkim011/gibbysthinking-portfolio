const mongoose = require("mongoose");

const ImageModelSchema = new mongoose.Schema(
  {
    image: String,
    order: Number
  },
  {
    collection: "images"
  }
)

module.exports = mongoose.model("imageModel", ImageModelSchema);
