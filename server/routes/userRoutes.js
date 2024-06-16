const express = require('express')
const { authMiddleware } = require("../utils/auth");

const { 
  loginUser,
  editAboutMe
} = require('../controllers/userControllers');
const { updateMany } = require('../models/userModel');

const router = express.Router()

////// Routes
router.get('/', authMiddleware, (req, res) => {
  res.status(200).json({ message: 'Protected route accessed' });
});

router.post('/login', loginUser);
router.post('/edit-about-me', editAboutMe);


module.exports = router