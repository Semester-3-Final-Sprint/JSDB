const dal = require("./m.db");

// returns array of authors with author_id, author_name (for select)
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

// gets all author info by author_id for display
async function mongoGetAuthorById(id) {
  try {
    await dal.connect();
    const query = { author_id: parseInt(id) };
    const cursor = dal
      .db("owls_library")
      .collection("Author")
      .aggregate([
        {
          $match: {
            author_id: parseInt(id),
          },
        },
        {
          $project: {
            _id: 0,
            author_id: 1,
            author_name: { $concat: ["$first_name", " ", "$last_name"] },
            birth_date: 1,
            birth_country: 1,
            headshot: 1,
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
  mongoGetAuthorById,
};
