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

module.exports = {
  mongoGetAllBooks,
};
