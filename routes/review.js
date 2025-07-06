const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const Review = require("../models/review.js"); //R---schema
const Listing = require("../models/listing.js"); //l---schema
const {validateReview, isLoggedIn} = require("../middleware.js")

//Reviews
//----Post route---
router.post(
  "/",
  validateReview,
  isLoggedIn,
  wrapAsync(async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    console.log(newReview)
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    req.flash("Success", "New Review added!");

    res.redirect(`/listings/${listing._id}`);
  })
);

//delete Review Route

router.delete(
  "/:reviewId",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("Success", " Review Deleted!");

    res.redirect(`/listings/${id}`);
  })
);

module.exports = router;
