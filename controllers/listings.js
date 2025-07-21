const Listing = require("../models/listing")


module.exports.index = async (req, res) => {
    const alllistings = await Listing.find({});
    res.render("listings/index", { alllistings });
  };

module.exports.renderNew = (req, res) => {
  res.render("listings/new.ejs");}

module.exports.showListing = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id)
      .populate({path:"reviews",
        populate:{path:"author"},
      })
      .populate("owner");
    // if (!listing) throw new ExpressError(404, "Listing not found");
    if (!listing) {
      req.flash("error", "Listing you requested does not exist");
      return res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
  };

module.exports.createListing = async (req, res) => {
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user.id;
    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
  };

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    // if (!listing) throw new ExpressError(404, "Listing not found");
    if (!listing) {
      req.flash("error", "Listing you requested does not exist");
      return res.redirect("/listings");
    }
    res.render("listings/edit.ejs", { listing });
  };

module.exports.updateListing = async (req, res) => {
    const { id } = req.params;

    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
  };


module.exports.destroyListing = async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", " Listing Deleted!");
    res.redirect("/listings");
  };