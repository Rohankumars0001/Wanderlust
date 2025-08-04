if(process.env.NODE_ENV != "production"){
  require('dotenv').config()
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const cors = require("cors");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

// Routers
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const roomsRouter = require("./routes/rooms.js");
const housesRouter = require("./routes/house.js");
const flatsRouter = require("./routes/flats.js");

const port = 8080;
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

// MongoDB connection
mongoose.connect(MONGO_URL)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));
// Add this before routes
app.use((req, res, next) => {
  res.setTimeout(120000, () => { // 2 minutes
    console.log('Request timed out');
    res.status(408).send('Request timeout');
  });
  next();
});

// Session configuration
const sessionOptions = {
  secret: "mysupersecret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 3, // 3 days
    maxAge: 1000 * 60 * 60 * 24 * 3
  }
};

// Middleware setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(cors());
app.use(session(sessionOptions));
app.use(flash());

// Passport authentication setup
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Flash messages and user data for all views
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

// Mounting routers
app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter); // Nested route
app.use("/", userRouter);
app.use("/rooms", roomsRouter);
app.use("/", housesRouter);
app.use("/flats", flatsRouter);

// Home route
app.get("/home", (req, res) => {
  res.render("listings/home");
});

// // 404 handler
// app.all((req, res, next) => {
//   next(new ExpressError(404, "Page Not Found"));
// });


// Global error handler
app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).render("error", { message });
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}/home`);
});
