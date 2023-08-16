const express = require("express");
const bcrypt = require("bcrypt");
const authPool = require("../services/pg.auth.db.js");
const logEvents = require("../services/logEvents");

const router = express.Router();

// Handle POST request for user login
router.post('/', async (req, res) => {
    try {
        // Query to retrieve user data based on username
        const getUserQuery = "SELECT * FROM users WHERE username = $1";
        const result = await authPool.query(getUserQuery, [req.body.username]);
        const user = result.rows[0];

        if (!user) {
            // Log a failed login attempt and render login page with error message
            logEvents(req, 'LOGIN', 'info', `Failed login attempt for user ${req.body.username}`);
            return res.render('login', { errorMessage: 'User does not exist.' });
        }

        const providedPassword = req.body.password;

        // Query to clear logged-in status for other users
        const clearOtherUsersQuery = "UPDATE users SET isloggedin = false, loggedin = null WHERE username != $1";
        await authPool.query(clearOtherUsersQuery, [user.username]);

        if (user.password.startsWith('$2')) {
            // Compare hashed password using bcrypt
            const passwordMatch = await bcrypt.compare(providedPassword, user.password);

            if (passwordMatch) {
                // Update user's logged-in status, store user info in app.locals, log successful login, and redirect
                const updateUserQuery = "UPDATE users SET isloggedin = true, loggedin = $1 WHERE username = $2";
                await authPool.query(updateUserQuery, [user.username, user.username]);

                req.app.locals.loggedInUser = user;
                logEvents(req, 'LOGIN', 'info', `User ${user.username} logged in`);
                return res.redirect('/');
            } else {
                // Log failed login attempt due to incorrect password and render login page with error message
                logEvents(req, 'LOGIN', 'error', `Failed login attempt for user ${user.username}`);
                return res.render('login', { errorMessage: 'Incorrect password' });
            }
        } else {
            if (providedPassword === user.password) {
                // Update user's logged-in status, store user info in app.locals, log successful login, and redirect
                const updateUserQuery = "UPDATE users SET isloggedin = true, loggedin = $1 WHERE username = $2";
                await authPool.query(updateUserQuery, [user.username, user.username]);

                req.app.locals.loggedInUser = user;
                logEvents(req, 'LOGIN', 'info', `User ${user.username} logged in`);
                return res.redirect('/');
            } else {
                // Log failed login attempt due to incorrect password and render login page with error message
                logEvents(req, 'LOGIN', 'error', `Failed login attempt for user ${user.username}`);
                return res.render('login', { errorMessage: 'Incorrect password' });
            }
        }
    } catch (error) {
        // Handle errors, log error details, and send internal server error response
        console.error("Error during login:", error);
        logEvents(req, 'LOGIN', 'error', `Error during login for user ${req.body.username}`);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
