const express = require("express");
const router = express.Router();

const { getAllBooks, getBooksBasic } = require("../services/pg.books.dal");

router.get("/", async (req, res) => {
  //   const books = [
  //     {
  //       book_id: "1",
  //       title: "test book 1",
  //       description: "test description 1",
  //       ISBN: "12334234-5",
  //       release_date: "2021-11-12",
  //       book_image: "/images/genres/true_crime/001.jpg",
  //       author_name: "Johny John",
  //       genre_name: "True Crime",
  //     },
  //     {
  //       book_id: "2",
  //       title: "test book 2",
  //       description: "test description 2",
  //       ISBN: "22334234-2",
  //       release_date: "2021-22-12",
  //       book_image: "/images/genres/true_crime/002.jpg",
  //       author_name: "Cheryl Cher",
  //       genre_name: "True Crime",
  //     },
  //     {
  //       book_id: "3",
  //       title: "test book 3",
  //       description: "test description 3",
  //       ISBN: "32334234-5",
  //       release_date: "2021-31-12",
  //       book_image: "/images/genres/true_crime/003.jpg",
  //       author_name: "Billy Bob",
  //       genre_name: "True Crime",
  //     },
  //   ];
  try {
    let books = await getAllBooks(); //implement in dal.
    res.render("books", { books });
  } catch (error) {
    console.log("There was an error " + error);
  }
});

router.get("/api", async (req, res) => {
  //   const books = [
  //     {
  //       book_id: "1",
  //       title: "test book 1",
  //       description: "test description 1",
  //       ISBN: "12334234-5",
  //       release_date: "2021-11-12",
  //       book_image: "/images/genres/true_crime/001.jpg",
  //       author_name: "Johny John",
  //       genre_name: "True Crime",
  //     },
  //     {
  //       book_id: "2",
  //       title: "test book 2",
  //       description: "test description 2",
  //       ISBN: "22334234-2",
  //       release_date: "2021-22-12",
  //       book_image: "/images/genres/true_crime/002.jpg",
  //       author_name: "Cheryl Cher",
  //       genre_name: "True Crime",
  //     },
  //     {
  //       book_id: "3",
  //       title: "test book 3",
  //       description: "test description 3",
  //       ISBN: "32334234-5",
  //       release_date: "2021-31-12",
  //       book_image: "/images/genres/true_crime/003.jpg",
  //       author_name: "Billy Bob",
  //       genre_name: "True Crime",
  //     },
  //   ];
  try {
    let books = await getBooksBasic(); //from postgresql
    res.json({ books }, null, 2);
  } catch (error) {
    console.log("fuck!");
    // res.status(503).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
