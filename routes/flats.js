const express = require("express");
const router = express.Router();
const house = require("../models/flats.js"); // Make sure model file name is correct

// GET /House - Show all houses
router.get("/flats", async (req, res) => {
  const flats = await house.find({});
  res.render("category/flatslistings", { flats }); // Pass rooms to EJS
});

module.exports = router;
