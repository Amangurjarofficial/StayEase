const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const User = require("../models/user");
const router = express.Router({ mergeParams: true });
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js");
const userController = require("../controllers/users.js");


// signup root
router.get("/signup", userController.renderSignupForm);

// post root for signup 
router.post("/signup", wrapAsync(userController.signup));

// login route
router.get("/login", userController.renderLoginForm);

// post root for login
router.post("/login", saveRedirectUrl, passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }) ,userController.login);


// logout root
router.get("/logout", userController.logout);



module.exports = router;