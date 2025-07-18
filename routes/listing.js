const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing, isValidId } = require("../middleware.js");

const listingController = require("../controllers/listings.js")



// INDEX - GET /listings
router.get(
  "/",
  wrapAsync(listingController.index)
);

// NEW - GET /listings/new
router.get("/new", isLoggedIn, listingController.renderNew
);

// SHOW - GET /listings/:id
router.get(
  "/:id",
  isValidId,
  wrapAsync(listingController.showListing)
);
// CREATE - POST /listings
router.post(
  "/",
  isLoggedIn,
  validateListing,
  wrapAsync(listingController.createListing)
);

// EDIT - GET /listings/:id/edit
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  isValidId,
  wrapAsync(listingController.renderEditForm)
);

// UPDATE - PUT /listings/:id
router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  isValidId,
  validateListing,
  wrapAsync(listingController.updateListing)
);

// DELETE - DELETE /listings/:id
router.delete(
  "/:id",
  isOwner,
  isLoggedIn,
  isValidId,
  wrapAsync(listingController.destroyListing)
);



module.exports = router;
