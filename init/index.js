const dns = require("dns");

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const initData = require("./data.js");

require("dotenv").config({ path: "../.env" });

const MONGO_URL = process.env.ATLASDB_URL;

main()
  .then(async () => {
    console.log("connected to DB");
    await initDB();
    await mongoose.connection.close();
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

async function initDB() {
  await Listing.deleteMany({});

  const listingsWithOwner = initData.data.map((obj) => ({
    ...obj,
    owner: new mongoose.Types.ObjectId("6a7449994a4a0bc13ef5caa4"),
  }));

  await Listing.insertMany(listingsWithOwner);

  console.log("Database initialized successfully!");
}