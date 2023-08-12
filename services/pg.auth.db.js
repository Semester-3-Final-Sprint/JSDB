require("dotenv").config();

const Pool = require("pg").Pool;
const authPool = new Pool({
  user: process.env.PGAUTHUSER,
  host: process.env.PGAUTHHOST,
  database: process.env.PGAUTHDATABASE,
  password: process.env.PGAUTHPASSWORD,
  port: process.env.PGAUTHPORT,
});
module.exports = authPool;