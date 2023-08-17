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

// get basic Books info (for 'old' api output)
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

// filter books by genre_id
const getBookByGenreId = (id) => {
  if (DEBUG) console.log("pg.books.dal.getBookByGenreId()");
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM all_books WHERE genre_id = $1`;
    dal.query(sql, [id], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.rows);
      }
    });
  });
};

// filter books by author_id
const getBooksByAuthorId = (id) => {
  if (DEBUG) console.log("pg.books.dal.getBooksByAuthorId()");
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM all_books WHERE author_id = $1`;
    dal.query(sql, [id], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.rows);
      }
    });
  });
};

// search titles for text input
const getBooksByTitle = (text) => {
  if (DEBUG) console.log("pg.books.dal.getBookByTitle()");
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM all_books \
    WHERE title LIKE '%'||$1||'%'`;
    dal.query(sql, [text], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.rows);
      }
    });
  });
};

// search descriptions for text input
const getBooksByDescription = (text) => {
  if (DEBUG) console.log("pg.books.dal.getBookByDescription()");
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM all_books \
    WHERE description LIKE '%'||$1||'%'`;
    dal.query(sql, [text], (err, result) => {
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
  getBookByGenreId,
  getBooksByAuthorId,
  getBooksByTitle,
  getBooksByDescription,
};
