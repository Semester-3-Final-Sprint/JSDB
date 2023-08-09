const express = require("express");
const bcrypt = require("bcrypt");
const authPool = require("../services/auth_db.js");

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

        if (user.password.startsWith('$2')) {
            if (DEBUG) console.log("Comparing hashed passwords using bcrypt.");
            // Password is hashed, compare using bcrypt
            const passwordMatch = await bcrypt.compare(providedPassword, user.password);

            if (passwordMatch) {
                res.redirect('/');
            } else {
                if (DEBUG) console.log("Incorrect password:", providedPassword);
                res.status(400).send('Incorrect password');
            }
        } else {
            if (DEBUG) console.log("Comparing plain text passwords.");
            // Password is not hashed, compare as plain text (used for admin login for testing...)
            if (providedPassword === user.password) {
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
