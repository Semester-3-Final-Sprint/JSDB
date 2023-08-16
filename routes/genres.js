const express = require("express");
const router = express.Router();

// const { getGenres } = require("../services/pg.genres.dal");
const cache = require("../services/cacheManager");
const { getGenreById, getGenresFull } = require("../services/pg.genres.dal");

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
    const genres = cache.genresGet(); //from cache
    res.json({ genres });
  } catch (error) {
    res.status(503).json({ error: "Internal Server Error" });
  }
});

router.get("/api/all", async (req, res) => {
  try {
    const genres = await getGenresFull();
    res.json({ genres });
  } catch (error) {
    res.status(503).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
