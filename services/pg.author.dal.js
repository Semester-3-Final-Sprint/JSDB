const dal = require("./pg.db");

//get all authors for select
const getAuthors = () => {
  console.log("pg.books.dal.getAuthors()");
  return new Promise((resolve, reject) => {
    const sql = `SELECT author_id, first_name || ' ' || last_name AS author_name FROM public."Author" ORDER BY author_name ASC`;
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
  getAuthors,
};
