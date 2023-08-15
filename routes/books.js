const express = require("express");
const router = express.Router();

// const {
//   getAllBooks,
//   getBooksBasic,
//   getBookByGenreId,
//   getBooksByAuthorId,
//   getBooksByTitle,
//   getBooksByDescription,
// } = require("../services/pg.books.dal");
const {
  mongoGetAllBooks,
  mongoGetBooksByDescription,
  mongoGetBooksByTitle,
} = require("../services/m.books.dal");
// const { getGenres } = require("../services/pg.genres.dal");
const cache = require("../services/cacheManager");

// router.get("/", async (req, res) => {
//   //   const books = [
//   //     {
//   //       book_id: "1",
//   //       title: "test book 1",
//   //       description: "test description 1",
//   //       ISBN: "12334234-5",
//   //       release_date: "2021-11-12",
//   //       book_image: "/images/genres/true_crime/001.jpg",
//   //       author_name: "Johny John",
//   //       genre_name: "True Crime",
//   //     },
//   //     {
//   //       book_id: "2",
//   //       title: "test book 2",
//   //       description: "test description 2",
//   //       ISBN: "22334234-2",
//   //       release_date: "2021-22-12",
//   //       book_image: "/images/genres/true_crime/002.jpg",
//   //       author_name: "Cheryl Cher",
//   //       genre_name: "True Crime",
//   //     },
//   //     {
//   //       book_id: "3",
//   //       title: "test book 3",
//   //       description: "test description 3",
//   //       ISBN: "32334234-5",
//   //       release_date: "2021-31-12",
//   //       book_image: "/images/genres/true_crime/003.jpg",
//   //       author_name: "Billy Bob",
//   //       genre_name: "True Crime",
//   //     },
//   //   ];
//   try {
//     let books = await getAllBooks(); //implement in dal.
//     // let genres = await getGenres();
//     // let genres = cache.genresGet();
//     res.render("books", { books });
//   } catch (error) {
//     console.log("There was an error " + error);
//   }
// });

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
    let books = await mongoGetAllBooks(); //implement in dal.
    // let genres = await getGenres();
    // let genres = cache.genresGet();
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

router.get("/:id", async (req, res) => {
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
    let books = await getBookByGenreId(req.params.id);
    // let genres = cache.genresGet();
    if (books.length === 0) {
      res.render("norecord");
    } else {
      res.render("books", { books });
    }
  } catch {
    res.render("503");
  }
});

router.get("/author/:id", async (req, res) => {
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
    let books = await getBooksByAuthorId(req.params.id);
    // let genres = cache.genresGet();
    if (books.length === 0) {
      res.render("norecord");
    } else {
      res.render("books", { books });
    }
  } catch {
    res.render("503");
  }
});

// text search by title
router.get("/searchTitle/:text", async (req, res) => {
  // if pg search is selected
  try {
    let books = await getBooksByTitle(req.params.text);
    if (books.length === 0) {
      res.statusCode = 404;
      res.json({ message: "Not Found", status: 404 });
    } else {
      res.render("books", { books });
    }
  } catch {
    // if mongo search is selected
    try {
      let books = await mongoGetBooksByTitle(req.params.text);
      if (books.length === 0) {
        res.statusCode = 404;
        res.json({ message: "Not Found", status: 404 });
      } else {
        res.render("books", { books });
      }
    } catch {
      res.render("503");
    }
  }
});

// text search by description
router.get("/searchDescription/:text", async (req, res) => {
  // if pg search is selected
  try {
    let books = await getBooksByDescription(req.params.text);
    if (books.length === 0) {
      res.statusCode = 404;
      res.json({ message: "Not Found", status: 404 });
    } else {
      res.render("books", { books });
    }
  } catch {
    // if mongo search is selected
    try {
      let books = await mongoGetBooksByDescription(req.params.text);
      if (books.length === 0) {
        res.statusCode = 404;
        res.json({ message: "Not Found", status: 404 });
      } else {
        res.render("books", { books });
      }
    } catch {
      res.render("503");
    }
  }
});

module.exports = router;
