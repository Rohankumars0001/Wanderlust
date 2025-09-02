const mongoose = require("mongoose");
const sampleFlats = require("./flatData.js"); // your flats data
const Flat = require("../models/flats.js"); // new model

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.error("Connection error:", err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initFlatDB = async () => {
  try {
    await Flat.deleteMany({});
    const updatedFlats = sampleFlats.map((flat) => ({
      ...flat,
      owner: "684c2ef6a40944bc3283e6f7", // same owner ID
    }));

    await Flat.insertMany(updatedFlats);
    console.log("Flat collection created and seeded.");
    process.exit();
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
};

initFlatDB();
