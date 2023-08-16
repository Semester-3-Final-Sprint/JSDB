const dal = require("./m.db");

async function mongoGetAuthors() {
  try {
    await dal.connect();
    const cursor = dal
      .db("owls_library")
      .collection("Author")
      .aggregate([
        {
          $project: {
            _id: 0,
            author_id: 1,
            author_name: { $concat: ["$first_name", " ", "$last_name"] },
          },
        },
        {
          $sort: { author_name: 1 },
        },
      ]);
    const results = await cursor.toArray();
    return results;
  } catch (error) {
    console.log(error);
  }
}
async function mongoGetAuthorById(id) {
  try {
    await dal.connect();
    const query = { author_id: parseInt(id) };
    const cursor = dal.db("owls_library").collection("Author").find(query);
    const results = await cursor.toArray();
    return results;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  mongoGetAuthors,
  mongoGetAuthorById,
};
