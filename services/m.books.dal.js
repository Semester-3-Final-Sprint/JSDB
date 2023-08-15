// const { ObjectId } = require("mongodb");

const dal = require("./m.db");
const books = dal.db("owls_library").collection("Book");

async function mongoGetAllBooks() {
  try {
    await dal.connect();
    const cursor = books.find();
    const results = await cursor.toArray();
    return results;
  } catch (error) {
    console.log(error);
  } finally {
    await dal.close(); // Close the connection when done
  }
}

async function mongoGetBookByGenreId(id) {
  try {
    await dal.connect();
    const cursor = books.find({ genre_id: id });
    const results = await cursor.toArray();
    return results;
  } catch (error) {
    console.log(error);
  } finally {
    await dal.close(); // Close the connection when done
  }
}

async function mongoGetBooksByAuthorId(id) {
  try {
    await dal.connect();
    const cursor = books.find({ author_id: id });
    const results = await cursor.toArray();
    return results;
  } catch (error) {
    console.log(error);
  } finally {
    await dal.close(); // Close the connection when done
  }
}

module.exports = {
  mongoGetAllBooks,
  mongoGetBookByGenreId,
  mongoGetBooksByAuthorId,
};
