const Pool = require('pg').Pool
const authPool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Auth',
  password: '',
  port: 5432,
});
module.exports = authPool;