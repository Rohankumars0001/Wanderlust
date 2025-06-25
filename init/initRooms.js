const mongoose = require("mongoose");
const sampleRooms = require("./roomData.js");
const Room = require("../models/rooms.js"); // new model

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

const initRoomDB = async () => {
  try {
    await Room.deleteMany({}); // ✅ fixed typo here
    const updatedRooms = sampleRooms.map((room) => ({
      ...room,
      owner: "684c2ef6a40944bc3283e6f7", // valid User ID
    }));

    await Room.insertMany(updatedRooms);
    console.log("Room collection created and seeded.");
    process.exit();
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
};

initRoomDB();
