const express = require("express");
const router = express.Router();
const flatsController = require("../controllers/flats.js")

// GET /House - Show all houses
router.get("/flats", flatsController.showFlats);

module.exports = router;
