const express = require('express')
const { authMiddleware } = require("../utils/auth");

const { 
  loginUser,
  
} = require('../controllers/userControllers')

const router = express.Router()

////// Routes
router.get('/', authMiddleware, (req, res) => {
  res.status(200).json({ message: 'Protected route accessed' });
});

router.post('/login', loginUser)



module.exports = router