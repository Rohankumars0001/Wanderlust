const house = require("../models/flats.js"); 

module.exports.showFlats = async (req, res) => {
  const flats = await house.find({});
  res.render("category/flatslistings", { flats }); // Pass rooms to EJS
};
