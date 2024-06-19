const User = require("../models/userModel");
const { signToken } = require('../utils/auth');

const loginUser = async (req, res) => {
  try {
    const {username, password} = req.body;
    const user = await User.findOne({username})
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

const editAboutMe = async (req, res) => {
  try {
    const {username, aboutMe} = req.body;
    const user = await User.findOneAndUpdate(
      {username},
      {aboutMe}
    )
    console.log(user)
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'About Me updated successfully', user });
  } catch (error) {
    res.json({status: error});
  }
}

const queryMe = async (req, res) => {
  try {
    const user = await User.findOne({});
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}


module.exports = {
  loginUser,
  editAboutMe,
  queryMe
}