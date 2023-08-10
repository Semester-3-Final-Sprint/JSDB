const authPool = require("./pg.auth.db");

const getAllUsers = () => {
console.log("pg.books.dal.getAllUsers()");
    return new Promise((resolve, reject) => {
      const authSql = "SELECT * FROM users";
      authPool.query(authSql, [], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.rows);
        }
      });
    });
  };


  module.exports = getAllUsers;