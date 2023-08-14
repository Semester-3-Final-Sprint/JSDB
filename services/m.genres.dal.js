const dal = require("./m.db");

async function mongoGetGenres() {
  try {
    await dal.connect();
    const cursor = dal
      .db("owls_library")
      .collection("Genre")
      .aggregate([{ $project: { _id: 0, genre_id: 1, genre_name: 1 } }]);
    const results = await cursor.toArray();
    // console.log(results); //check return here
    return results;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  mongoGetGenres,
};
