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

app.listen(3000, () => {
  console.log("listening on 3000");
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
