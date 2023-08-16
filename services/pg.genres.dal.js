const dal = require("./pg.db");

//get all books
const getGenres = () => {
  console.log("pg.books.dal.getAllCategory()");
  return new Promise((resolve, reject) => {
    const sql = `SELECT genre_id, genre_name FROM public."Genre"`;
    dal.query(sql, [], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.rows);
      }
    });
  });
};

const getGenresFull = () => {
  console.log("pg.books.dal.getAllGenresFull()");
  return new Promise((resolve, reject) => {
    const sql = `SELECT genre_id, genre_name, genre_description, genre_image FROM public."Genre"`;
    dal.query(sql, [], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.rows);
      }
    });
  });
};

const getGenreById = (id) => {
  console.log("pg.author.dal.getGenreById()");
  return new Promise((resolve, reject) => {
    const sql = `SELECT genre_id, genre_name, genre_description, genre_image FROM public."Genre" WHERE genre_id = $1`;
    dal.query(sql, [id], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.rows);
      }
    });
  });
};

module.exports = {
  getGenres,
  getGenreById,
  getGenresFull,
};
