const { any } = require("joi");
const Room = require("../models/rooms"); // Ensure this model file exists


// Show all rooms
module.exports.showRooms = async (req, res) => {
  const rooms = await Room.find({});
  res.render("category/Rooms/roomslisting", { rooms }); // Use your correct EJS path
};

// Show details of one room
module.exports.showRoom = async (req, res) => {
  const { id } = req.params;

  const room = await Room.findById(id)
    .populate({
      path: "reviews",
      populate: { path: "author" },
    })
    .populate("owner");

  if (!room) {
    req.flash("error", "The room you have requested does not exist!");
    return res.redirect("/rooms");
  }

  res.render("category/Rooms/showRoom", { room }); // Match your actual view path
};



module.exports.renderNew =async (req, res, next) => {
  try {
    if (!req.user) {
      req.flash("error", "You must be logged in to create a listing.");
      return res.redirect("/login");
    }

    const newRoom = new Room(req.body.listing);
    newRoom.owner = req.user._id;

    await newRoom.save();
    req.flash("success", "New Room Created!");
    res.redirect("/Rooms");
  } catch (err) {
    next(err); // Pass to global error handler
  }
};


