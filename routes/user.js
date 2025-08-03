const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/user.js")
const passport = require("passport");

router.route("/signup")
    .get( 
      userController.renderSignupForm
    )
    .post(
      wrapAsync(userController.userSignup)
    );

router.
    route("/login")
      .get(
        userController.renderLoginForm 
      )
  .post(
      saveRedirectUrl,
        passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true,
      }),
    userController.userLogin
    );

router.get("/logout", userController.userLogout);

module.exports = router;