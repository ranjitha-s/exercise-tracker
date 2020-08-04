const express = require("express");
const mongoose = require("mongoose");
const config = require("config");

const app = express();

app.use(express.json());

// DB Config
const db = config.get("mongoURI");

// Connect to mongo
mongoose
  .connect(process.env.MONGO_URI || db, {
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

app.use("/exercises", require("./routes/exercises"));
app.use("/users", require("./routes/users"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port);
