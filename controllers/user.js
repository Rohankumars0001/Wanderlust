const User = require("../models/user.js");
const passport = require("passport");

module.exports.userSignup = async (req, res) => {
    try {
      let { username, email, password } = req.body;
      const newUser = new User({ email, username });
      const registeredUser = await User.register(newUser, password);
      req.login(registeredUser, (err) => {
        if (err) {
          next(err);
        }
        req.flash("Success", "Welcome to Wanderlust");
        res.redirect("/listings");
      });
    } catch (err) {
      req.flash("error", err.message);
      res.redirect("/signup");
    }
  };


module.exports.userLogin =  module.exports.userLogin = [
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  async (req, res) => {
    req.flash("Success", "Welcome Back to wanderlust you are logged in");
    const redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
  }
];



module.exports.userLogout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("Success", "you are logged out!");
    res.redirect("/listings");
  });
};