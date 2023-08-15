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
    const query = { genre_id: parseInt(id) };
    const cursor = books.find(query);
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
    const query = { author_id: parseInt(id) };
    const cursor = books.find(query);
    const results = await cursor.toArray();
    return results;
  } catch (error) {
    console.log(error);
    throw error("");
  } finally {
    await dal.close(); // Close the connection when done
  }
}

async function mongoGetBooksByTitle(text) {
  if (DEBUG) console.log("m.books.dal.mongoGetBooksByTitle()");
  try {
    await dal.connect();
    const cursor = dal.db("owls_library").collection("Book");
    const query = { title: { $regex: text, $options: "i" } };
    const result = await cursor.find(query).toArray();
    return result;
  } catch (err) {
    console.error("Error occured while connecting to mongo: ", err);
    throw err;
  } finally {
    dal.close();
  }
}

async function mongoGetBooksByDescription(text) {
  if (DEBUG) console.log("m.books.dal.mongoGetBooksByDescription()");
  try {
    await dal.connect();
    const cursor = dal.db("owls_library").collection("Book");
    const query = { description: { $regex: text, $options: "i" } };
    const result = await cursor.find(query).toArray();
    return result;
  } catch (err) {
    console.error("Error occured while connecting to mongo: ", err);
    throw err;
  } finally {
    dal.close();
  }
}

module.exports = {
  mongoGetAllBooks,
  mongoGetBookByGenreId,
  mongoGetBooksByAuthorId,
  mongoGetBooksByTitle,
  mongoGetBooksByDescription,
};
