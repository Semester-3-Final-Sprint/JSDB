const { getGenres } = require("../services/pg.genres.dal");
const { getAuthors } = require("../services/pg.author.dal");

// genres cache
let genres = [];

async function loadGenres() {
  genres = await getGenres();
  console.log("loadGenres()...");
}

const genresGet = () => {
  return genres;
};

// authors cache
let authors = [];

async function loadAuthors() {
  authors = await getAuthors();
  console.log("loadAuthors()...");
  //   console.log(authors);
}

const authorsGet = () => {
  return authors;
};

// run all function
function cacheExecute() {
  let d = new Date();
  minutes = d.getMinutes();
  minutes = minutes < 10 ? "0" + minutes : minutes;
  let time = `${d.getHours()}:${minutes}`;
  console.log(`cacheExecute @ ${time}`);
  loadGenres();
  loadAuthors();
}

const cacheStart = () => {
  cacheExecute();
  setInterval(cacheExecute, 300000);
};

loadAuthors();
module.exports = {
  genresGet,
  authorsGet,
  cacheStart,
};
