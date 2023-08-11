var router = require("express").Router();
const pgDal = require("../../services/pg.fulltext.dal");

// api/full
router.get("/pg/:text", async (req, res) => {
  if (DEBUG) console.log("ROUTE: /api/full/pg/ GET " + req.params.text);
  try {
    let theText = await pgDal.getFullText(req.params.text);
    if (theText.length === 0) {
      res.statusCode = 404;
      res.json({ message: "Not Found", status: 404 });
    } else {
      res.json(theText);
    }
  } catch {
    res.statusCode = 503;
    res.json({ message: "Servic Unavailable", status: 503 });
  }
});

module.exports = router;
