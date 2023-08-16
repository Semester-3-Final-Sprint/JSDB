const express = require("express");
const authPool = require("../services/pg.auth.db.js");
const logEvents = require("../services/logEvents");

const router = express.Router();

// Handle GET request for user logout
router.get('/logout', async (req, res) => {
    try {
        if (req.app.locals.loggedInUser) {
            // Get the username of the currently logged-in user
            const username = req.app.locals.loggedInUser.username;

            // Update the user's isloggedin status to false and clear loggedin timestamp
            const logoutQuery = "UPDATE users SET isloggedin = false, loggedin = null WHERE username = $1";
            await authPool.query(logoutQuery, [username]);

            // Remove the user's information from app.locals
            req.app.locals.loggedInUser = null;

            // Log the user's logout event and print a message to console
            logEvents(req, 'LOGOUTS', 'info', `User ${username} logged out`);
            console.log("Logged out user:", username);
        }
        
        // Redirect the user back to the home page
        return res.redirect('/');
    } catch (error) {
        // Handle errors, log error details, and send internal server error response
        console.error("Error during logout:", error);
        logEvents(req, 'logout', 'error', `Error during logout for user ${req.app.locals.loggedInUser?.username}`);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
