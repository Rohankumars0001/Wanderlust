const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const houseSchema = new Schema({
  title: {
    type: String,
    required: false,
  },
  description: {
    type: String,
  },
  image: {
    filename: {
      type: String,
      default: "houseimage",
    },
    url: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=1200&auto=format&fit=crop",
      set: function (v) {
        return v && v.trim() !== ""
          ? v
          : "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=1200&auto=format&fit=crop";
      },
    },
  },
  price: {
    type: Number,
    default: 0,
  },
  location: {
    type: String,
  },
  country: {
    type: String,
  },
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

houseSchema.post("findOneAndDelete", async (house) => {
  if (house) {
    await mongoose.model("Review").deleteMany({ _id: { $in: house.reviews } });
  }
});

const House = mongoose.model("House", houseSchema);
module.exports = House;
