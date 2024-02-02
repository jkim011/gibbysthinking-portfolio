const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");
const cors = require("cors")

const app = express();
const port = 3001;
app.use(express.json());

const corsOptions = {
    origin:'http://localhost:3000', 
    optionSuccessStatus:200
  }
app.use(cors(corsOptions));

mongoose.connect("mongodb://localhost:27017/gibbysthinking_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((e) => {
    console.log(e);
  })

require("../server/models/ImageModel");
const Images = mongoose.model("imageModel");

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// COMMENT OUT WHEN USING IN LOCALHOST
// app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/build/index.html'));
// });


////// For image uploads
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

app.post("/upload", upload.single("image"), async (req, res) => {
  console.log(req.body);
  const imageName = req.file.filename;
  try {
    await Images.create({image: imageName})
    res.json({status: "ok"})
  } catch (error) {
    res.json({status: error})
  }
});

app.get("/get-image", async (req, res) => {
  try {
    Images.find({}).then(data => {
      res.send({status: "ok", data: data});
    });
  } catch (error) {
    res.json({ status: error });
  }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});