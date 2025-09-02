require('dotenv').config();
const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing, isValidId } = require("../middleware.js");
const listingController = require("../controllers/listings.js")
const multer  = require('multer')
const { storage } = require("../cloudConfig.js")
const upload = multer({storage })

// CREATE - POST /listings
// INDEX - GET /listings

router
  .route("/")
    .get(
      wrapAsync(listingController.index)
    )
    .post(
    isLoggedIn,
    upload.single('listing[image]'),
    // validateListing,
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
        upload.single('listing[image]'),
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
