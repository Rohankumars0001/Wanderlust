const Listing = require("../models/listing.js"); //l---schema
const Review = require("../models/review.js"); //R---schema

module.exports.createReview = async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    req.flash("Success", "Review added!");

    res.redirect(`/listings/${listing._id}`);
  };

  module.exports.destroyReview = async (req, res) => {
    const { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("Success", " Review Deleted!");

    res.redirect(`/listings/${id}`);
  };