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

mongoose.model("userModel", UserModelSchema);