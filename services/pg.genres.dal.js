const dal = require("./pg.db");

//get all books
const getGenres = () => {
  if (DEBUG) console.log("pg.books.dal.getAllCategory()");
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

module.exports = {
  getGenres,
};
