const express = require("express");
const bcrypt = require("bcrypt");
const authPool = require("../services/pg.auth.db.js");
const logEvents = require("../services/logEvents"); // Import the logEvents function

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const getUsersQuery = "SELECT * FROM users";
        const result = await authPool.query(getUsersQuery);
        const users = result.rows;

        // Log the event
        logEvents(req, 'REGISTER', 'info', 'Fetched users data');
        
        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        // Log the error event
        logEvents(req, 'REGISTER', 'error', 'Error fetching users data');
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

        // Log the event
        logEvents(req, 'REGISTER', 'info', `User ${req.body.username} created`);
        res.redirect('/login');
        res.status(201).send();
    } catch (error) {
        console.error("Error creating user:", error);
        // Log the error event
        logEvents(req, 'REGISTER', 'error', `Error creating user ${req.body.username}`);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
