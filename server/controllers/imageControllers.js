const mongoose = require("mongoose");
require("../models/ImageModel");
const Images = mongoose.model("imageModel");


const uploadImage = async (req, res) => {
  console.log(req.body);
  const imageName = req.file.filename;
  try {
    await Images.create({image: imageName})
    res.json({status: "ok"})
  } catch (error) {
    res.json({status: error})
  }
};

const getImage = async (req, res) => {
  try {
    Images.find({}).then(data => {
      res.send({status: "ok", data: data});
    });
  } catch (error) {
    res.json({ status: error });
  }
};


module.exports = {
  uploadImage,
  getImage
}