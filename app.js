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

app.post("/shortUrl", async (req, res) => {
  await shortUrl.create({ full: req.body.fullUrl });
  res.redirect("/");
});

app.get("/:shortUrl", async (req, res) => {
  const shortUrl = await shortUrl.findOne({ short: req.params.shortUrl });
  if (!shortUrl) return res.redirect(404);

  shortUrl.clicks++;
  shortUrl.save();

  res.redirect(shortUrl.full);
});

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
