const express = require("express");
const mongoose = require("mongoose");

//db connection
mongoose
  .connect("mongodb://localhost:27017/urlshortner")
  .then(() => console.log("database connected"))
  .catch((error) => console.log("Database connection failed", error.message));

const PORT = 3000;
const app = express();

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
