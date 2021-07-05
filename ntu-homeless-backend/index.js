require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3001;

const data = require("./sheetsDataManager");

app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/api/data", (req, res) => {
  res.send(data);
});

app.listen(port, () => {
  console.log(`Listening at port ${port}`);
});
