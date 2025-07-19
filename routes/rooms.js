const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing, isValidId } = require("../middleware.js");

const roomsController = require("../controllers/rooms.js");
const Room = require("../models/rooms.js"); // ✅ Needed for findById

// All routes are mounted at "/rooms" in app.js
// So, define routes relative to that

// INDEX - GET /rooms
router.get("/", wrapAsync(roomsController.showRooms));

// SHOW - GET /rooms/:id
router.get("/:id", isValidId, wrapAsync(async (req, res) => {
  const { id } = req.params;
  const room = await Room.findById(id).populate("owner");
  if (!room) {
    req.flash("error", "Room not found!");
    return res.redirect("/rooms");
  }
  res.render("category/Rooms/showRoom", { room });
}));

// NEW - GET /rooms/new
// router.get("/new", isLoggedIn, roomsController.renderNew);

// CREATE - POST /rooms
// router.post("/", isLoggedIn, validateListing, wrapAsync(roomsController.createRoom));

// EDIT - GET /rooms/:id/edit
// router.get("/:id/edit", isLoggedIn, isOwner, isValidId, wrapAsync(roomsController.renderEditForm));

// UPDATE - PUT /rooms/:id
// router.put("/:id", isLoggedIn, isOwner, isValidId, validateListing, wrapAsync(roomsController.updateRoom));

// DELETE - DELETE /rooms/:id
// router.delete("/:id", isOwner, isLoggedIn, isValidId, wrapAsync(roomsController.deleteRoom));

module.exports = router;
