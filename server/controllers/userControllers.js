const User = require("../models/userModel");
const { signToken } = require('../utils/auth');

const loginUser = async (req, res) => {
  try {
    const {username, password} = req.body;
    console.log(username, "username from req")
    const user = await User.findOne({username})
    console.log(user, "user controllers")
    if(user.password === password) {
      const token = signToken(user)
      res.status(200).json({username, token})
    } else {
      res.error("Incorrect password")
    }
  } catch (error) {
    res.status(400).json({error: error.message})  
  }
}

module.exports = {
  loginUser,
}