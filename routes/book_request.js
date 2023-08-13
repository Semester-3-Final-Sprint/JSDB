const express = require("express");
const router = express.Router();
const fs = require("fs");

//Route to get requests
router.get("/routes/requested_books", (req, res) => {
  let bookRequests = [];
  try {
    const data = fs.readFileSync("bookRequests.json", "utf8");
    bookRequests = JSON.parse(data);
  } catch (error) {
    console.log("Error reading file", error);
  }

  res.render("/routes/requested_books", { bookRequests }); //Render a template with the list
});

//Route for handling book requests
router.post("/routes/book_request", (req, res) => {
  const { author, title } = req.body;

  //Load existing requests from the JSON file
  let bookRequests = [];
  try {
    const data = fs.readFileSync("bookRequests.json", "utf8");
    bookRequests = JSON.parse(data);
  } catch (error) {
    console.log("Request not found.", error);
  }

  //Add new request to the list
  bookRequests.push({ author, title });

  //Write the updated requests back to the JSON file
  fs.writeFileSync("bookRequests.json", JSON.stringify(bookRequests, null, 2));

  res.redirect("/partials/footer"); //Redirect back to footer area
});

module.exports = router;
