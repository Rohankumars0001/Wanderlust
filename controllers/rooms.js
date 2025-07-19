const { any } = require("joi");
const Room = require("../models/rooms"); // Ensure this model file exists

// Show all rooms
module.exports.showRooms = async (req, res) => {
  const rooms = await Room.find({});
  res.render("category/Rooms/roomslistings", { rooms });
};

// // Render form to create a new room
// module.exports.renderNew = (req, res) => {
//   res.render("category/newRoom");
// };

// // Create a new room
// module.exports.createRoom = async (req, res) => {
//   const newRoom = new Room(req.body.room);
//   newRoom.owner = req.user._id;
//   await newRoom.save();
//   req.flash("success", "New Room Created!");
//   res.redirect("/rooms");
// };

// Show details of one room
// module.exports.showRoom = any;

// // Render edit form
// module.exports.renderEditForm = async (req, res) => {
//   const { id } = req.params;
//   const room = await Room.findById(id);
//   if (!room) {
//     req.flash("error", "Room not found!");
//     return res.redirect("/rooms");
//   }
//   res.render("category/editRoom", { room });
// };

// // Update room
// module.exports.updateRoom = async (req, res) => {
//   const { id } = req.params;
//   await Room.findByIdAndUpdate(id, { ...req.body.room });
//   req.flash("success", "Room updated!");
//   res.redirect(`/rooms/${id}`);
// };

// // Delete room
// module.exports.deleteRoom = async (req, res) => {
//   const { id } = req.params;
//   await Room.findByIdAndDelete(id);
//   req.flash("success", "Room deleted!");
//   res.redirect("/rooms");
// };
