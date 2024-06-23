const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")

const imageRoutes = require('./routes/imageRoutes');
const userRoutes = require('./routes/userRoutes');
const mailRoutes = require('./routes/mailRoutes');

const app = express();
const port = 3001;
app.use(express.json());

const corsOptions = {
    origin:'http://localhost:3000', 
    optionSuccessStatus:200
  }
app.use(cors(corsOptions));

////// Routes
app.use('/api/image', imageRoutes);
app.use('/api/user', userRoutes);
app.use('api/mail', mailRoutes);

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


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});