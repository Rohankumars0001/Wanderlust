const Room = require("../models/rooms.js"); 


module.exports.showRooms = async (req, res) => {
  const rooms = await Room.find({});
  res.render("category/rooms/roomslistings", { rooms }); // Pass rooms to EJS
};


module.exports.showRoom = async(req,res)=>{
    const {id} = req.params;

    const room = await Room.findById(id).populate({path:"reviews",
        populate:{path:"author"},
      })
      .populate("owner");
  

    if(!room){
        req.flash("error","The room you have requested Does not exists!");
        return res.redirect("/rooms");
    }
    res.render("category/rooms/room.ejs",{room})

};