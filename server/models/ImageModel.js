const mongoose = require("mongoose");

const ImageModelSchema = new mongoose.Schema(
  {
    image: String
  },
  {
    collection: "images"
  }
)

module.exports = mongoose.model("imageModel", ImageModelSchema);
