const User = require("../models/userModel");
const { signToken } = require('../utils/auth');

const loginUser = async (req, res) => {
  const {username, password} = req.body;
  try {
    const user = await User.find({})
    if(user.password === password) {
      const token = signToken(user)
      res.status(200).json({username, token})
    } else {
      res.error("Incorrect password")
    }
// res.send(user)
  } catch (error) {
    res.status(400).json({error: error.message})  
  }
}


module.exports = {
  loginUser,
}