const express = require("express");
const router = express.Router();
const roomsController = require("../controllers/rooms.js")


// GET /Rooms - Show all rooms
router.get("/Rooms",roomsController.showRooms);

module.exports = router;
