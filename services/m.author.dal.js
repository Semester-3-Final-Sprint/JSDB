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
      ]);
    const results = await cursor.toArray();
    return results;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  mongoGetAuthors,
};
