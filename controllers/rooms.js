const Room = require("../models/rooms.js"); 

module.exports.showRooms = async (req, res) => {
  const rooms = await Room.find({});
  res.render("category/roomslistings", { rooms }); // Pass rooms to EJS
};
