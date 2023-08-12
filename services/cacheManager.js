const { getGenres } = require("../services/pg.genres.dal");

// genres cache
let genres = [];

async function loadGenres() {
  genres = await getGenres();
  console.log("loadGenres()...");
}

loadGenres();
setInterval(loadGenres, 300000);

const genresGet = () => {
  return genres;
};

module.exports = {
  genresGet,
};
