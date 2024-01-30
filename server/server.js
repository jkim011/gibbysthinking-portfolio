const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");
const cors = require("cors")

const app = express();
const port = 3001;
app.use(express.json());

const corsOptions = {
    origin:'http://localhost:3000', 
    // access:true,   
    optionSuccessStatus:200
  }
app.use(cors(corsOptions));


mongoose.connect("mongodb://localhost:27017/gibbysthinking_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const Image = mongoose.model("Image", {
    filename: String,
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post("/upload", upload.array("images", 10), async (req, res) => {
    const files = req.files.map(file => ({
        data: file.buffer,
        contentType: file.mimetype,
    }));
    console.log("server response:", files)

    try {
        const savedImages = await Image.create(files);
        res.json(savedImages);

    } catch (error) {
        res.status(500).json({ error: "Error saving images to the database" });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});