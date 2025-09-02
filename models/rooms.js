const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js"); // <-- important

const roomSchema = new Schema({
  title: {
    type: String,
    required: false,
  },
  description: String,
  image: {
    filename: {
      type: String,
      default: "roomimage",
    },
    url: {
      type: String,
      default: "https://images.unsplash.com/photo-1586348943529-beaae6c28db9?q=80&w=1015&auto=format&fit=crop",
      set: function (v) {
        return v && v.trim() !== ""
          ? v
          : "https://images.unsplash.com/photo-1586348943529-beaae6c28db9?q=80&w=1015&auto=format&fit=crop";
      },
    },
  },
  price: {
    type: Number,
    default: 0,
  },
  location: String,
  country: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

roomSchema.post("findOneAndDelete", async (room) => {
  if (room) {
    await Review.deleteMany({ _id: { $in: room.reviews } });
  }
});

const Room = mongoose.model("Room", roomSchema);
module.exports = Room;
