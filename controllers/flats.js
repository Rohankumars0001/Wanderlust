const Flats = require("../models/flats.js");

module.exports.showFlats = async (req, res) => {
  try {
    const flats = await Flats.find({});
    res.render("category/Flats/flatslistings", { flats });
  } catch (err) {
    req.flash("error", "Unable to fetch flats listings.");
    res.redirect("/");
  }
};

module.exports.showRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const flat = await Flats.findById(id)
      .populate({
        path: "reviews",
        populate: { path: "author" },
      })
      .populate("owner");

    if (!flat) {
      req.flash("error", "The flat you requested does not exist!");
      return res.redirect("/flats");
    }

    res.render("category/Flats/showFlat", { flat });
  } catch (err) {
    req.flash("error", "Error loading flat details.");
    res.redirect("/flats");
  }
};
