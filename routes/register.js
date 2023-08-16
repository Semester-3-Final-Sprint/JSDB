const express = require("express");
const bcrypt = require("bcrypt");
const authPool = require("../services/pg.auth.db.js");
const logEvents = require("../services/logEvents"); // Import the logEvents function

const router = express.Router();

// Handle GET request to fetch all users
router.get('/', async (req, res) => {
    try {
        // SQL query to fetch all users
        const getUsersQuery = "SELECT * FROM users";
        const result = await authPool.query(getUsersQuery);
        const users = result.rows;

        // Log the event of fetching users data
        logEvents(req, 'REGISTER', 'info', 'Fetched users data');

        // Send the fetched users data as JSON response
        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        // Log the error event when there's an issue fetching users data
        logEvents(req, 'REGISTER', 'error', 'Error fetching users data');
        res.status(500).send("Internal Server Error");
    }
});

// Handle POST request to create a new user
router.post('/', async (req, res) => {
    try {
        // Generate a salt and hash the password using bcrypt
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // Debug print salt and hashed password if needed
        if (DEBUG) console.log(salt);
        if (DEBUG) console.log(hashedPassword);

        // SQL query to insert a new user with hashed password
        const insertUserQuery = "INSERT INTO users (username, password) VALUES ($1, $2)";
        await authPool.query(insertUserQuery, [req.body.username, hashedPassword]);

        // Log the event of user creation
        logEvents(req, 'REGISTER', 'info', `User ${req.body.username} created`);

        // Redirect to the login page with a successful status
        res.redirect('/login');
        res.status(201).send();
    } catch (error) {
        console.error("Error creating user:", error);
        // Log the error event when there's an issue creating a user
        logEvents(req, 'REGISTER', 'error', `Error creating user ${req.body.username}`);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
