const express = require("express");
const listings = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner} = require("../middleware.js");
const {validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });



    // Index Route
    listings.get("/", wrapAsync(listingController.index));

    // new Route
    listings.get("/new", isLoggedIn, wrapAsync(listingController.renderNewForm));

    // Show Route
    listings.get("/:id", wrapAsync(listingController.showListing));

    // Create Route using wrapAsync function
    listings.post("/", isLoggedIn, upload.single("listing[image]"), validateListing, wrapAsync(listingController.createListing));
  

    // Edit Route
    listings.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));


    // update Route
    listings.put("/:id", isLoggedIn, isOwner, upload.single("listing[image]"), validateListing, wrapAsync(listingController.updateListing));

    // Delete Route
    listings.delete("/:id", isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

    module.exports = listings;