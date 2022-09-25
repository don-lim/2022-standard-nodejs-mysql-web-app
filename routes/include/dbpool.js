
const mysql = require('mysql2');
const pool = mysql.createPool({
  connectionLimit : 100, //important    
  host: process.env.MASTER_DB_HOST,
  port: process.env.MASTER_DB_PORT,
  user: process.env.MASTER_DB_USER,
  password: process.env.MASTER_DB_PW,
  database: process.env.MASTER_DB_INSTANCE,
  multipleStatements: true
});
// You can run muliple SQL statements in one go because we have declared 'multipleStatements' as true.
// However, DO NOT allow multiple statements if you are worried about getting hacked by SQL Injection.
// So, delete 'multipleStatements: true' in production for security.
module.exports = pool;
