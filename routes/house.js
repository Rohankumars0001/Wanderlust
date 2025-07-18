const express = require("express");
const router = express.Router();
const houseController = require("../controllers/house.js")

// GET /House - Show all houses
router.get("/houses",houseController.showHouse );

module.exports = router;
