const { getGenres } = require("../services/pg.genres.dal");
const { getAuthors } = require("../services/pg.author.dal");
const { mongoGetGenres } = require("../services/m.genres.dal");
const { mongoGetAuthors } = require("../services/m.author.dal");

// genres cache
let genres = [];

async function mongoLoadGenres() {
  genres = await mongoGetGenres();
  console.log("mongoLoadGenres()...");
}

async function loadGenres() {
  genres = await getGenres();
  console.log("loadGenres()...");
}

const genresGet = () => {
  return genres;
};

// authors cache
let authors = [];

async function mongoLoadAuthors() {
  authors = await mongoGetAuthors();
  console.log("mongoLoadAuthors()...");
}

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

function mongoCacheExecute() {
  let d = new Date();
  minutes = d.getMinutes();
  minutes = minutes < 10 ? "0" + minutes : minutes;
  let time = `${d.getHours()}:${minutes}`;
  console.log(`mongoCacheExecute @ ${time}`);
  mongoLoadGenres();
  mongoLoadAuthors();
}

let intervalId;

const cacheStart = (activeDB) => {
  clearInterval(intervalId);
  if (activeDB === "postgres") {
    cacheExecute();
    intervalId = setInterval(cacheExecute, 300000);
  } else {
    mongoCacheExecute();
    intervalId = setInterval(mongoCacheExecute, 300000);
  }
};

module.exports = {
  genresGet,
  authorsGet,
  cacheStart,
};
