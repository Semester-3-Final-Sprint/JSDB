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

module.exports = {
  getAllBooks,
};
