const express = require("express");
const methodOverride = require("method-override");

const getAllUsers = require("./services/pg.users.dal.js");

const app = express();
const PORT = 3000;

// Default DB
app.locals.activeDB = "postgres";

// start cache based on default db.
const cache = require("./services/cacheManager");
cache.cacheStart(app.locals.activeDB);

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

app.get("/db-switch", (req, res) => {
  app.locals.activeDB =
    app.locals.activeDB === "postgres" ? "mongo" : "postgres";
  cache.cacheStart(app.locals.activeDB);
  res.redirect("/books");
});

const genreRouter = require("./routes/genres.js");
app.use("/genres", genreRouter);

const authorRouter = require("./routes/authors");
app.use("/authors", authorRouter);

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

getAllUsers()
  .then((users) => {
    console.log("Fetched users:", users);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

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
