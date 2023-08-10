var router = require("express").Router();
const booksDal = require("../../services/pg.books.dal");

// api/books
router.get("/", async (req, res) => {
  if (DEBUG) console.log("ROUTE: /api/actors/ GET " + req.url);
  try {
    let theBooks = await booksDal.getAllBooks();
    res.json(theBooks);
  } catch {
    res.statusCode = 503;
    res.json({ message: "Service Unavailable", status: 503 });
  }
});
