const express = require("express");
const bcrypt = require("bcrypt");
const authPool = require("../services/pg.auth.db.js");


const router = express.Router();

router.post('/', async (req, res) => {
    try {
        if (DEBUG) console.log("Received login request:", req.body);

        const getUserQuery = "SELECT * FROM users WHERE username = $1";
        const result = await authPool.query(getUserQuery, [req.body.username]);
        const user = result.rows[0];

        if (!user) {
            if (DEBUG) console.log("User not found:", req.body.username);
            return res.status(400).send('User does not exist.');
        }

        const providedPassword = req.body.password;

        // Clear isloggedin and loggedin fields for all other users
        const clearOtherUsersQuery = "UPDATE users SET isloggedin = false, loggedin = null WHERE username != $1";
        await authPool.query(clearOtherUsersQuery, [user.username]);

        if (user.password.startsWith('$2')) {
            if (DEBUG) console.log("Comparing hashed passwords using bcrypt.");
            // Password is hashed, compare using bcrypt
            const passwordMatch = await bcrypt.compare(providedPassword, user.password);

            if (passwordMatch) {
                // Update the user's isloggedin value to true
                const updateUserQuery = "UPDATE users SET isloggedin = true, loggedin = $1 WHERE username = $2";
                await authPool.query(updateUserQuery, [user.username, user.username]);
                res.redirect('/');
            } else {
                if (DEBUG) console.log("Incorrect password:", providedPassword);
                res.status(400).send('Incorrect password');
            }
        } else {
            if (DEBUG) console.log("Comparing plain text passwords.");
            // Password is not hashed, compare as plain text (used for admin login for testing...)
            if (providedPassword === user.password) {
                // Update the user's isloggedin value to true
                const updateUserQuery = "UPDATE users SET isloggedin = true, loggedin = $1 WHERE username = $2";
                await authPool.query(updateUserQuery, [user.username, user.username]);
                console.log("User logged in: ", user);
                res.redirect('/');
            } else {
                if (DEBUG) console.log("Incorrect password:", providedPassword);
                res.status(400).send('Incorrect password');
            }
        }
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).send("Internal Server Error");
    }

});

module.exports = router;
