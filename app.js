const express = require("express");
const mongoose = require("mongoose");
const shortUrl = require("./models/shortUrl");

//db connection
mongoose
  .connect("mongodb://localhost:27017/urlshortner")
  .then(() => console.log("database connected"))
  .catch((error) => console.log("Database connection failed", error.message));

const PORT = 3000;
const app = express();

app.set("view engine", "hbs");
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  const shortUrls = await shortUrl.find();
  res.render("index", { shortUrls });
});

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
