const dal = require("./pg.db");

//get all books
const getAllBooks = () => {
  if (DEBUG) console.log("pg.books.dal.getBooks()");
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM all_books";
    dal.query(sql, [], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.rows);
      }
    });
  });
};

const getBooksBasic = () => {
  if (DEBUG) console.log("pg.books.dal.getBooksBasic()");
  return new Promise((resolve, reject) => {
    const sql = `SELECT author_id, genre_id, title, "ISBN", release_date, description, book_image\
            FROM public."Book"\
            ORDER BY genre_id, book_id ASC;`;
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
  getAllBooks,
  getBooksBasic,
};
