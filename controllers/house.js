const House = require("../models/house.js"); // Use PascalCase for model names by convention

module.exports.showHouses = async (req, res) => {
  try {
    const houses = await House.find({});
    res.render("category/House/houselistings", { houses });
  } catch (err) {
    req.flash("error", "Unable to fetch house listings.");
    res.redirect("/");
  }
};

module.exports.showHouse = async (req, res) => {
  try {
    const { id } = req.params;
    const house = await House.findById(id)
      .populate({
        path: "reviews",
        populate: { path: "author" },
      })
      .populate("owner");

    if (!house) {
      req.flash("error", "The house you requested does not exist!");
      return res.redirect("/houses");
    }

    res.render("category/House/showHouse", { House: house });
  } catch (err) {
    req.flash("error", "Error loading house details.");
    res.redirect("/houses");
  }
};
