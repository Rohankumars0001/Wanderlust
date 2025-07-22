const express = require("express");
const router = express.Router();
const flatsController = require("../controllers/flats.js");
const { isLoggedIn, isOwner, validateListing, isValidId } = require("../middleware.js");
const wrapAsync = require("../utils/wrapAsync.js");

// GET /House - Show all houses
router.get("/", wrapAsync(flatsController.showFlats));

router.get("/:id",isValidId,wrapAsync(flatsController.showRoom));

module.exports = router;
