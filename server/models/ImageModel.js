const mongoose = require("mongoose");

const ImageModelSchema = new mongoose.Schema(
  {
    image: String
  },
  {
    collection: "images"
  }
)

mongoose.model("imageModel", ImageModelSchema);