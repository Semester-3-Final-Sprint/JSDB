const express = require("express");
const bcrypt = require("bcrypt");
const authPool = require("../services/pg.auth.db.js");

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const getUsersQuery = "SELECT * FROM users";
        const result = await authPool.query(getUsersQuery);
        const users = result.rows;
        res.json(users);
        res.redirect('/');
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).send("Internal Server Error");
    }
});

router.post('/', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        if (DEBUG) console.log(salt);
        if (DEBUG) console.log(hashedPassword);

        const insertUserQuery = "INSERT INTO users (username, password) VALUES ($1, $2)";
        await authPool.query(insertUserQuery, [req.body.username, hashedPassword]); // Use req.body.username here

        res.status(201).send();
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).send("Internal Server Error");
    }
});


module.exports = router;