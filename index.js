const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

mongoose.connect(keys.mongoURI || process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
});

app.use("/exercises", require("./routes/exercises"));
app.use("/users", require("./routes/users"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port);
