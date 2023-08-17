const dal = require("./m.db");

// get genres with genre_id, genre_name (for select)
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

// get genre info for display by genre_id
async function mongoGetGenreById(id) {
  try {
    await dal.connect();
    query = { genre_id: parseInt(id) };
    const cursor = dal.db("owls_library").collection("Genre").find(query);
    const results = await cursor.toArray();
    return results;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  mongoGetGenres,
  mongoGetGenreById,
};
