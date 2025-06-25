const express = require("express");
const router = express.Router();
const Room = require("../models/rooms.js"); // Make sure model file name is correct

// GET /Rooms - Show all rooms
router.get("/Rooms", async (req, res) => {
  const rooms = await Room.find({});
  res.render("category/roomslistings", { rooms }); // Pass rooms to EJS
});

module.exports = router;
