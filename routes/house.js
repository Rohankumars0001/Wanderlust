const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const houseController = require("../controllers/house.js")
const { isLoggedIn, isOwner, validateListing, isValidId } = require("../middleware.js");

// GET /House - Show all houses
router.get("/houses",wrapAsync(houseController.showHouses) );

router.get("/houses/:id",isValidId,wrapAsync(houseController.showHouse))

module.exports = router;
