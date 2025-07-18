const house = require("../models/house.js"); // Make sure model file name is correct

module.exports.showHouse = async (req, res) => {
  const houses = await house.find({});
  res.render("category/houselistings", { houses }); // Pass rooms to EJS
};