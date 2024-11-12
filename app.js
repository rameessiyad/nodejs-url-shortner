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
  const shortUrls = await shortUrl.find({});
  console.log(shortUrls);
  res.render("index", { shortUrls });
});

app.post("/shortUrls", async (req, res) => {
  await shortUrl.create({ full: req.body.fullUrl });
  console.log(req.body);
  res.redirect("/");
});

app.get("/:shortUrl", async (req, res) => {
  const shorturl = await shortUrl.findOne({ short: req.params.shortUrl });
  if (!shorturl) return res.status(404).send("URL not found");

  shorturl.clicks++;
  shortUrl.save();

  res.redirect(shortUrl.full);
});

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
