const express = require("express");
const router = express.Router();

const { getGenres } = require("../services/pg.genres.dal");

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
    let genres = await getGenres(); //from postgresql
    res.json({ genres });
  } catch (error) {
    console.log("fuck!");
    // res.status(503).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
