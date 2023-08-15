const express = require("express");
const bcrypt = require("bcrypt");
const authPool = require("../services/pg.auth.db.js");
const logEvents = require("../services/logEvents"); 

const router = express.Router();

router.get('/logout', async (req, res) => {
    try {
        if (req.app.locals.loggedInUser) {
            const username = req.app.locals.loggedInUser.username;

            const logoutQuery = "UPDATE users SET isloggedin = false, loggedin = null WHERE username = $1";
            await authPool.query(logoutQuery, [username]);

            req.app.locals.loggedInUser = null; 

            logEvents(req, 'logout', 'info', `User ${username} logged out`);
            console.log("Logged out user:", username);
        }
        return res.redirect('/');
    } catch (error) {
        console.error("Error during logout:", error);
        logEvents(req, 'logout', 'error', `Error during logout for user ${req.app.locals.loggedInUser?.username}`);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
