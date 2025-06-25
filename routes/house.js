const express = require("express");
const router = express.Router();
const house = require("../models/house.js"); // Make sure model file name is correct

// GET /House - Show all houses
router.get("/houses", async (req, res) => {
  const houses = await house.find({});
  res.render("category/houselistings", { houses }); // Pass rooms to EJS
});

module.exports = router;
