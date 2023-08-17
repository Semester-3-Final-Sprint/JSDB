const express = require("express");
const router = express.Router();

const cache = require("../services/cacheManager");
const { getAuthorById, getAuthorFull } = require("../services/pg.author.dal");

// get all author_id, author_name (for select)
router.get("/api", async (req, res) => {
  //   const authors = [
  //     {
  //       author_id: "1",
  //       author_name: "author 1",
  //     },
  //     {
  //       author_id: "2",
  //       author_name: "author 2",
  //     },
  //     {
  //       author_id: "3",
  //       author_name: "author 3",
  //     },
  //   ];
  try {
    const authors = cache.authorsGet(); //from cache
    res.json({ authors });
  } catch (error) {
    res.status(503).json({ error: "Internal Server Error" });
  }
});

// get all authors with all details.
router.get("/api/all", async (req, res) => {
  try {
    const authors = await getAuthorFull();
    res.json({ authors });
  } catch (error) {
    res.status(503).json({ error: "Internal Server Error" });
  }
});

// get single author by author_id
router.get("/:id", async (req, res) => {
  try {
    console.log("Received id:", req.params.id);
    const author = await getAuthorById(req.params.id);
    console.log("Retrieved author:", author);
    res.json({ author });
  } catch (error) {
    res.status(503).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
