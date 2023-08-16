const express = require("express");
const router = express.Router();
const logEvents = require("../services/logEvents");

//const pgDal = require("../services/pg.fulltext.dal");

const {
  getAllBooks,
  getBooksBasic,
  getBookByGenreId,
  getBooksByAuthorId,
  getBooksByTitle,
  getBooksByDescription,
} = require("../services/pg.books.dal");
const {
  mongoGetAllBooks,
  mongoGetBookByGenreId,
  mongoGetBooksByAuthorId,
  mongoGetBooksByDescription,
  mongoGetBooksByTitle,
  mongoGetAuthors,
} = require("../services/m.books.dal");
const { getAuthorById } = require("../services/pg.author.dal");
const { mongoGetAuthorById } = require("../services/m.author.dal");

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
    let books = [];
    if (req.app.locals.activeDB === "postgres") {
      books = await getAllBooks();
      console.log("all books retrieved from postgres");
    } else {
      books = await mongoGetAllBooks();
      console.log("all books retrieved from mongoDB");
    }

    const data = {
      books,
      activeDB: req.app.locals.activeDB,
    };
    res.render("books", data);
  } catch (error) {
    console.log("There was an error " + error);
    res.status(503).render("503");
  }
});

// router.get("/api", async (req, res) => {
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
//     let books = await getBooksBasic(); //from postgresql
//     res.json({ books }, null, 2);
//   } catch (error) {
//     console.log("error!");
//     // res.status(503).json({ error: "Internal Server Error" });
//   }
// });

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
    let books = [];
    if (req.app.locals.activeDB === "postgres") {
      books = await getBookByGenreId(req.params.id);
      console.log("books retrieved from postgres");
      console.log(books);
      logEvents(
        req,
        "SELECT",
        "info",
        `Genre select: ${books[0].genre_name} (Postgres)`
      );
    } else {
      books = await mongoGetBookByGenreId(req.params.id);
      logEvents(
        req,
        "SELECT",
        "info",
        `Genre select: ${books[0].genre_name} (MongoDB)`
      );
      console.log("books retrieved from mongoDB");
    }
    // console.log(books);
    const data = {
      books,
      activeDB: req.app.locals.activeDB,
    };

    if (books.length === 0) {
      res.render("norecord");
    } else {
      res.render("books", data);
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
    //
    let books = [];
    let author = [];
    if (req.app.locals.activeDB === "postgres") {
      books = await getBooksByAuthorId(req.params.id);
      author = await getAuthorById(req.params.id);
      console.log("books and author retrieved from postgres");
      logEvents(req, "SEARCH", "info", `Author select: ${author[0].author_name} (Postgres)`);
    } else {
      books = await mongoGetBooksByAuthorId(req.params.id);
      author = await mongoGetAuthorById(req.params.id);
      console.log("books and author retrieved from mongoDB");
      logEvents(req, "SEARCH", "info", `Author select: ${author[0].first_name} ${author[0].last_name} (MongoDB)`);
    }

    // console.log(author[0]);

    // console.log("author: " + author);

    const data = {
      books,
      activeDB: req.app.locals.activeDB,
      author: author[0],
    };
    //
    if (books.length === 0) {
      res.render("norecord");
    } else {
      res.render("books", data);
    }
  } catch {
    res.render("503");
  }
});

// text search by title
router.get("/searchTitle/:text", async (req, res) => {
  try {
    let books = [];
    if (req.app.locals.activeDB === "postgres") {
      books = await getBooksByTitle(req.params.text);
      console.log("books retrieved from postgres");
      logEvents(
        req,
        "SEARCH",
        "info",
        `Title search: ${req.params.text} (Postgres)`
      );
    } else {
      books = await mongoGetBooksByTitle(req.params.text);
      console.log("books retrieved from postgres");
      logEvents(
        req,
        "SEARCH",
        "info",
        `Title search: ${req.params.text} (MongoDB)`
      );
    }

    const data = {
      books,
      activeDB: req.app.locals.activeDB,
    };

    if (books.length === 0) {
      res.render("norecord");
    } else {
      res.render("books", data);
    }
  } catch {
    res.render("503");
  }
});

// text search by description
router.get("/searchDescription/:text", async (req, res) => {
  try {
    let books = [];
    if (req.app.locals.activeDB === "postgres") {
      books = await getBooksByDescription(req.params.text);
      console.log("books retrieved from postgres");
      logEvents(
        req,
        "SEARCH",
        "info",
        `Description search: ${req.params.text} (Postgres)`
      );
    } else {
      books = await mongoGetBooksByDescription(req.params.text);
      console.log("books retrieved from postgres");
      logEvents(
        req,
        "SEARCH",
        "info",
        `Description search: ${req.params.text} (MongoDB)`
      );
    }

    const data = {
      books,
      activeDB: req.app.locals.activeDB,
    };

    if (books.length === 0) {
      res.render("norecord");
    } else {
      res.render("books", data);
    }
  } catch {
    res.render("503");
  }
});

module.exports = router;
