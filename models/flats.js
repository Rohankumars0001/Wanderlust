const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const flatSchema = new Schema({
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

flatSchema.post("findOneAndDelete", async (flats) => {
  if (flat) {
    await mongoose.model("Review").deleteMany({ _id: { $in: flat.reviews } });
  }
});

const flats = mongoose.model("flats", flatSchema);
module.exports = flats;
