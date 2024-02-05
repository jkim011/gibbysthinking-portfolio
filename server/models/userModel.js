const mongoose = require("mongoose");

const UserModelSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      trim: true
    },
    isAdmin: {
      type: Boolean,
      required: true
    }
  },
  {
    collection: "user"
  }
)

module.exports = mongoose.model("userModel", UserModelSchema);