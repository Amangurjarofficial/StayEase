const express = require("express");
const mongoose = require("mongoose");
const app = express("./data.js");
const Listing = require("../models/listing.js"); 
const initData = require("./data.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/stayEase";

main()
.then( async () => {
    console.log("connected to DB");
    await initDB();
})
.catch((err) => {
    console.log(err);
});

async function main(){
    await mongoose.connect(MONGO_URL);
}


async function initDB() {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({...obj, owner: "6a72ae2e43df0bdc531b85b7"}));
  await Listing.insertMany(initData.data); // or initData, depending on data.js
  console.log("Database initialized successfully!");
}