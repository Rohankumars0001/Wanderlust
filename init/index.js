const mongoose = require("mongoose");
const sampleListings = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then((res) => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});

  updateData = sampleListings.map((obj) => ({
    ...obj,
    owner: "684c2ef6a40944bc3283e6f7",
  }));
  await Listing.insertMany(updateData);
  console.log("Database initialized with sample data.");
};

initDB();
