const express = require("express");
const app = express();
const port = 3000;
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const sessOp = {
  secret: "keyboard cat",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
};

app.use(session(sessOp));
app.use(flash());

app.get("/register", (req, res) => {
  let { name = "anonymous" } = req.query;
  req.session.name = name;

  if (name === "anonymous") {
    req.flash("error", "some error occured");
  } else {
    req.flash("flash", "user registered!");
  }
  res.redirect("/hello");
});

app.get("/hello", (req, res) => {
  res.locals.success = req.flash("flash");
  res.locals.error = req.flash("error");

  res.render("page.ejs", { name: req.session.name });
});

app.get("/", (req, res) => {
  res.send("Hi I'm root");
});

app.listen(port, () => {
  console.log(`Server running well http://localhost:${port}`);
});
