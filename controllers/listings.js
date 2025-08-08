const Listing = require("../models/listing");
const axios = require("axios");
const mapToken = process.env.MAP_TOKEN; // Your MapTiler API key

// INDEX
module.exports.index = async (req, res) => {
  const alllistings = await Listing.find({});
  res.render("listings/index", { alllistings });
};

// RENDER NEW FORM
module.exports.renderNew = (req, res) => {
  res.render("listings/new.ejs");
};

// SHOW LISTING
module.exports.showListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: { path: "author" },
    })
    .populate("owner");

  if (!listing) {
    req.flash("error", "Listing you requested does not exist");
    return res.redirect("/listings");
  }
  res.render("listings/show.ejs", { listing });
};

// CREATE LISTING
module.exports.createListing = async (req, res, next) => {
  try {
    // Ensure user is logged in
    if (!req.user) {
      req.flash("error", "You must be logged in to create a listing.");
      return res.redirect("/login");
    }

    // Ensure image was uploaded
    if (!req.file) {
      req.flash("error", "Image upload failed or missing.");
      return res.redirect("/listings/new");
    }

    const location = req.body.listing.location;

    // Get coordinates from MapTiler
    const geoResponse = await axios.get(
      `https://api.maptiler.com/geocoding/${encodeURIComponent(location)}.json`,
      {
        params: {
          key: mapToken,
          limit: 1,
        },
      }
    );

    if (geoResponse.data.features.length === 0) {
      req.flash("error", "Location not found");
      return res.redirect("/listings/new");
    }

    const geometry = geoResponse.data.features[0].geometry; // GeoJSON format
    console.log(geometry)
    // Create new listing
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {
      url: req.file.path,
      filename: req.file.filename,
    };
    newListing.geometry = geometry; // Save coordinates
    console.log(newListing);
    await newListing.save();

    req.flash("success", "New Listing Created!");
    res.redirect(`/listings/${newListing._id}`);

  } catch (err) {
    console.error(err.message);
    next(err);
  }
};

// RENDER EDIT FORM
module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);

  if (!listing) {
    req.flash("error", "Listing you requested does not exist");
    return res.redirect("/listings");
  }

  const originalImageUrl = listing?.image?.url || null;
  res.render("listings/edit.ejs", { listing, originalImageUrl });
};

// UPDATE LISTING
module.exports.updateListing = async (req, res) => {
  const { id } = req.params;

  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

  if (req.file) {
    listing.image = {
      url: req.file.path,
      filename: req.file.filename,
    };
    await listing.save();
  }

  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`);
};

// DELETE LISTING
module.exports.destroyListing = async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted!");
  res.redirect("/listings");
};
