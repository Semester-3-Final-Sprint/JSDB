const express = require("express");
const router = express.Router();

const cache = require("../services/cacheManager");

router.get("/api", async (req, res) => {
  //   const genres = [
  //     {
  //       genre_id: "1",
  //       genre_name: "Genre 1",
  //     },
  //     {
  //       genre_id: "2",
  //       genre_name: "Genre 2",
  //     },
  //     {
  //       genre_id: "3",
  //       genre_name: "Genre 3",
  //     },
  //   ];
  try {
    const authors = cache.authorsGet(); //from cache
    res.json({ authors });
  } catch (error) {
    res.status(503).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
