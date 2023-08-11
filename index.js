const express = require("express");
const methodOverride = require("method-override");

const app = express();
const PORT = 3000;

global.DEBUG = true;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

const booksRouter = require("./routes/books");
app.use("/books", booksRouter);

app.get("/", (req, res) => {
  res.redirect("/books");
});

const loginRouter = require("./routes/login.js");
app.get("/login", (req, res) => {
  res.render("login");
});

app.use("/login", loginRouter);

const registerRouter = require("./routes/register");
app.get("/register", (req, res) => {
  res.render("register");
});

app.use("/register", registerRouter);

const apiRouter = require("./routes/api");
app.use("/api", apiRouter);

app.listen(PORT, () => {
  console.log(`Server active and listening on port ${PORT}`);

  if (DEBUG) {
    console.log("Debug mode is enabled.");
    console.log("Login router: ", loginRouter);
    console.log(
      "Available routes: ",
      app._router.stack.map((layer) => layer.route)
    );
  }
});
