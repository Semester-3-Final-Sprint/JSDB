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

  const getLoggedInUser = async () => {
    try {
        const users = await getAllUsers();
        const loggedInUser = users.find(user => user.isloggedin === true && user.username === user.loggedin);
        return loggedInUser || null; 
    } catch (error) {
        console.error("Error fetching logged-in user:", error);
        throw error;
    }
};

  module.exports = getAllUsers, getLoggedInUser;

  

