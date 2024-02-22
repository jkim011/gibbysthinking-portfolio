const Images = require("../models/ImageModel");

const uploadImage = async (req, res) => {
  console.log(req.body);
  const imageName = req.file.filename;
  const imageCount = await Images.countDocuments();
  try {
    await Images.create({image: imageName, order: imageCount+1})
    res.json({status: "ok"})
  } catch (error) {
    res.json({status: error})
  }
};

const getImage = async (req, res) => {
  try {
    Images.find({}).sort({order: -1}).then(data => {
      res.send({status: "ok", data: data});
    });
  } catch (error) {
    res.json({ status: error });
  }
};

const saveImageOrder = async (req, res) => {
  const { imageOrder } = req.body;
  console.log("saveImageOrder", imageOrder)
  try {
    await Promise.all(
      imageOrder.map(async (id, index) => {
        await Images.updateMany({ _id: id }, { $set: {order: -(index + 1)} })
      })
    );
    res.json({ status: "ok" });
  } catch (error) {
    res.json({ status: error });
  }
};


module.exports = {
  uploadImage,
  getImage,
  saveImageOrder
}