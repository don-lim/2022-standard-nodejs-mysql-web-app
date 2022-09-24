var express = require('express');
var router = express.Router();

const mysql = require('mysql');
const connection = mysql.createConnection({
  host: process.env.MASTER_DB_HOST,
  port: process.env.MASTER_DB_PORT,
  user: process.env.MASTER_DB_USER,
  password: process.env.MASTER_DB_PW,
  database: process.env.MASTER_DB_INSTANCE
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL Server!');
});

router.get("/",(req,res) => {
    connection.query('SELECT COUNT(*) FROM dbmaster;', (err, rows) => {
        if(err) throw err;
        res.send(rows);
        console.log('The data from dbmaster table are: \n', rows);
//        connection.end();
    });
});

module.exports = router;
