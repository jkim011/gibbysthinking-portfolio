const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

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
    },
    aboutMe: {
      type: String,
      required: true,
      trim: true
    }
  },
  {
    collection: "user"
  }
)

UserModelSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

UserModelSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("userModel", UserModelSchema);