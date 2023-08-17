const dal = require("./pg.db");

//get all authors for select
const getAuthors = () => {
  console.log("pg.author.dal.getAuthors()");
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

// get all author information (for api use)
const getAuthorFull = () => {
  console.log("pg.author.dal.getAuthorFull()");
  return new Promise((resolve, reject) => {
    const sql = `SELECT author_id, first_name, last_name, birth_date, birth_country, headshot FROM public."Author";`;
    dal.query(sql, [], (err, result) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(result.rows);
      }
    });
  });
};

// get author info by author_id (for display)
const getAuthorById = (id) => {
  console.log("pg.author.dal.getAuthorByID()");
  return new Promise((resolve, reject) => {
    const sql = `SELECT author_id, first_name || ' ' || last_name AS author_name, birth_date, birth_country, headshot FROM public."Author" WHERE author_id = $1;`;
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
  getAuthors,
  getAuthorById,
  getAuthorFull,
};
