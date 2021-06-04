const { Pool } = require('pg');

module.exports = new Pool({
  user: 'postgres',
  password: 'ben1231025',
  host: 'localhost',
  port: 5432,
  database: 'rocketstudy'
})