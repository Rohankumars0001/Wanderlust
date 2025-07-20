const express = require("express");
const router = express.Router();
const roomsController = require("../controllers/rooms.js")

// GET /Rooms - Show all rooms
router.get("/rooms",roomsController.showRooms);

router.get("/room/:id",roomsController.showRoom);

module.exports = router;
