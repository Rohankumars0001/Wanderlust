const mongoose = require("mongoose");
const sampleHouses = require("./houseData.js");
const House = require("../models/house.js"); // House model

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

const initHouseDB = async () => {
  try {
    // Optional: remove this if you don't want to delete existing houses
    await House.deleteMany({}); 

    const updatedHouses = sampleHouses.map((house) => ({
      ...house,
      owner: "684c2ef6a40944bc3283e6f7", // valid User ID
    }));

    await House.insertMany(updatedHouses);
    console.log("House collection created and seeded.");
    process.exit();
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
};

initHouseDB();
