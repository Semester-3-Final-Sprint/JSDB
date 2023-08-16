const authPool = require("./pg.auth.db");


// Function to retrieve all users from the database
const getAllUsers = () => {
  console.log("pg.books.dal.getAllUsers()");
  return new Promise((resolve, reject) => {
    // SQL query to retrieve all users
    const authSql = "SELECT * FROM users";
    authPool.query(authSql, [], (err, result) => {
      if (err) {
        // Reject the promise with the error if query execution fails
        reject(err);
      } else {
        // Resolve the promise with the rows of users if query succeeds
        resolve(result.rows);
      }
    });
  });
};

// Function to retrieve the currently logged-in user
const getLoggedInUser = async () => {
  try {
    // Fetch all users using the getAllUsers function
    const users = await getAllUsers();

    // Find the user who is currently logged in based on isloggedin and loggedin columns
    const loggedInUser = users.find(
      (user) => user.isloggedin === true && user.username === user.loggedin
    );

    // Return the logged-in user if found, or null if not found
    return loggedInUser || null;
  } catch (error) {
    console.error("Error fetching logged-in user:", error);
    // Rethrow the error to be caught by the calling function
    throw error;
  }
};

  module.exports = getAllUsers, getLoggedInUser;

  

