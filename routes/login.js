const express = require("express");
const bcrypt = require("bcrypt");
const authPool = require("../services/pg.auth.db.js");

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const getUserQuery = "SELECT * FROM users WHERE username = $1";
        const result = await authPool.query(getUserQuery, [req.body.username]);
        const user = result.rows[0];

        if (!user) {
            return res.render('login', { errorMessage: 'User does not exist.' });
        }

        const providedPassword = req.body.password;

        const clearOtherUsersQuery = "UPDATE users SET isloggedin = false, loggedin = null WHERE username != $1";
        await authPool.query(clearOtherUsersQuery, [user.username]);

        if (user.password.startsWith('$2')) {
            const passwordMatch = await bcrypt.compare(providedPassword, user.password);

            if (passwordMatch) {
                const updateUserQuery = "UPDATE users SET isloggedin = true, loggedin = $1 WHERE username = $2";
                await authPool.query(updateUserQuery, [user.username, user.username]);

                req.app.locals.loggedInUser = user;

                console.log("Logged in user:", user);
                return res.redirect('/');
            } else {
                return res.render('login', { errorMessage: 'Incorrect password' });
            }
        } else {
            if (providedPassword === user.password) {
                // Update the user's isloggedin value to true
                const updateUserQuery = "UPDATE users SET isloggedin = true, loggedin = $1 WHERE username = $2";
                await authPool.query(updateUserQuery, [user.username, user.username]);

                req.app.locals.loggedInUser = user;
                console.log("Logged in user:", user);
                return res.redirect('/');
            } else {
                return res.render('login', { errorMessage: 'Incorrect password' });
            }
        }
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).send("Internal Server Error");
    }
});


module.exports = router;
