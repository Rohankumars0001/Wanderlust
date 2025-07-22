const Room = require("../models/rooms");

// Show all rooms
module.exports.showRooms = async (req, res) => {
  try {
    const rooms = await Room.find({});
    res.render("category/Rooms/roomslisting", { rooms });
  } catch (err) {
    req.flash("error", "Unable to load rooms.");
    res.redirect("/");
  }
};

// Show details of a single room
module.exports.showRoom = async (req, res) => {
  try {
    const { id } = req.params;

    const room = await Room.findById(id)
      .populate({
        path: "reviews",
        populate: { path: "author" },
      })
      .populate("owner");

    if (!room) {
      req.flash("error", "The room you requested does not exist!");
      return res.redirect("/rooms");
    }

    res.render("category/Rooms/showRoom", { room });
  } catch (err) {
    req.flash("error", "Error loading room details.");
    res.redirect("/rooms");
  }
};

// Render new room form and create room
module.exports.renderNew = async (req, res, next) => {
  try {
    if (!req.user) {
      req.flash("error", "You must be logged in to create a listing.");
      return res.redirect("/login");
    }

    const newRoom = new Room(req.body.listing);
    newRoom.owner = req.user._id;

    await newRoom.save();
    req.flash("success", "New room created!");
    res.redirect("/rooms");
  } catch (err) {
    next(err);
  }
};
