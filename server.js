const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const cors = require("cors");

const authroutes = require("./routes/auth");

app.use(cors());
app.use(
  express.json({
    extended: false,
    type: "application/json",
  })
);

app.use("/public", express.static(path.join(__dirname, "/uploads")));
app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.use("/api", authroutes);
// app.get("/api", );

app.get("/test", (req, res) => {
  res.status(200).json({
    message: "hello, I am functional",
  });
});

mongoose
  .connect(
    "mongodb+srv://Samcanes:Irtesam211@cluster0.fxmnn.mongodb.net/havi?retryWrites=true&w=majority"
    // {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    //   useCreateIndex: true,
    //   useFindAndModify: false,
    // }
  )
  .then(() => {
    console.log(`connection to database established`);
  })
  .catch((err) => {
    console.log(`db error ${err.message}`);
    process.exit(-1);
  });

app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
