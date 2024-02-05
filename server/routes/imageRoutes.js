const express = require("express");
const multer = require("multer");
const {
  uploadImage,
  getImage
} = require('../controllers/imageControllers');

const router = express.Router();

////// For upload-image
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../client/src/assets/art/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  }
});
const upload = multer({ storage: storage })

////// Routes
router.post("/upload-image", upload.single("image"), uploadImage);

router.get("/get-image", getImage);


module.exports = router