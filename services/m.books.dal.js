// const { ObjectId } = require("mongodb");

const dal = require("./m.db");

async function mongoGetAllBooks() {
  try {
    await dal.connect();
    const cursor = dal.db("owls_library").collection("Book").find();
    const results = await cursor.toArray();
    return results;
  } catch (error) {
    console.log(error);
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
  mongoGetBooksByTitle,
  mongoGetBooksByDescription,
};
