const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");

// Validate MongoDB ObjectId
const isValidId = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ExpressError(400, "Invalid listing ID format");
  }
  next();
};

// INDEX - GET /listings
router.get(
  "/",
  wrapAsync(async (req, res) => {
    const alllistings = await Listing.find({});
    res.render("listings/index", { alllistings });
  })
);

// NEW - GET /listings/new
router.get("/new", isLoggedIn, (req, res) => {
  res.render("listings/new.ejs");
});

// CREATE - POST /listings
router.post(
  "/",
  isLoggedIn,
  validateListing,
  wrapAsync(async (req, res) => {
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user.id;
    await newListing.save();
    req.flash("Success", "New Listing Created!");
    res.redirect("/listings");
  })
);

// EDIT - GET /listings/:id/edit
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  isValidId,
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    // if (!listing) throw new ExpressError(404, "Listing not found");
    if (!listing) {
      req.flash("error", "Listing you requested does not exist");
      return res.redirect("/listings");
    }
    res.render("listings/edit.ejs", { listing });
  })
);

// UPDATE - PUT /listings/:id
router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  isValidId,
  validateListing,
  wrapAsync(async (req, res) => {
    const { id } = req.params;

    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("Success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
  })
);

// DELETE - DELETE /listings/:id
router.delete(
  "/:id",
  isOwner,
  isLoggedIn,
  isValidId,
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("Success", " Listing Deleted!");
    res.redirect("/listings");
  })
);

// SHOW - GET /listings/:id
router.get(
  "/:id",
  isValidId,
  wrapAsync(async (req, res) => {
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
  })
);

module.exports = router;
