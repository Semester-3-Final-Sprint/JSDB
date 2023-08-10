var router = require("express").Router();

if (DEBUG) {
  console.log("ROUTE: /api/book");
  console.log("ROUTE: /api/full");
}

const booksRouter = require("./books");
router.use("/books", booksRouter);

const fulltextRouter = require("./fulltext");
router.use("/full", fulltextRouter);

module.exports = router;
