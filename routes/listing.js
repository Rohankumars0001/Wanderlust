const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing, isValidId } = require("../middleware.js");
const listingController = require("../controllers/listings.js")


// CREATE - POST /listings
// INDEX - GET /listings

router
  .route("/")
    .get(
      wrapAsync(listingController.index)
    )
    .post(
    isLoggedIn,
    validateListing,
    wrapAsync(listingController.createListing)
  );

// NEW - GET /listings/new
router.get("/new", isLoggedIn, listingController.renderNew
);

// SHOW - GET /listings/:id
// UPDATE - PUT /listings/:id
// DELETE - DELETE /listings/:id
router
     .route("/:id")
     .get(
        isValidId,
        wrapAsync(listingController.showListing)
      )
      .put(
        isLoggedIn,
        isOwner,
        isValidId,
        validateListing,
        wrapAsync(listingController.updateListing)
      )
      .delete(
        isOwner,
        isLoggedIn,
        isValidId,
        wrapAsync(listingController.destroyListing)
      );


// EDIT - GET /listings/:id/edit
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  isValidId,
  wrapAsync(listingController.renderEditForm)
);


module.exports = router;
