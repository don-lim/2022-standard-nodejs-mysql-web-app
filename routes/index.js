express = require('express'); // This could have been "var[or const] express = require('express')". But, JavaScript usually don't need 'var' in front of a variable. Don Lim
router = express.Router(); // run Router() function within express. You can omit 'var' or 'const', but let's put 'const' to avoid strange errors we my see.
const mysql = require('mysql2');
const { config } = require('dotenv');
const pool = require('./include/dbpool'); // require mysql and createPool with 100 connection limit and .env DB variables.
const poolPromise = pool.promise();

const filedate = require('./filedate'); // import './filedate.js' from the same directory (.js can be omitted)
filedate.getFileDate(__filename); // run the function 'getFileDate()' inside the './filedate.js' with the path of the current file and output to console.log

const configFile = require('./include/config'); // import './include/config.js' (.js can be omitted) | 'configFile' was used because 'config' is a reserved command in another module.
console.log('config data: ' + configFile.data.userId, configFile.data.email, configFile.varInConfig); // you can put common configuration info in './include/config.js' as a JSON array or single variables.

/*************** http://127.0.0.1:3000/ ****************/
// the following line in JavaScript ES6 is the same as "router.get('/', function(req, res, next) {"
router.get('/', (req, res, next) => {
  res.render('index', { // render './views/index.ejs' with following parameters // './views/' and '.ejs' are omitted.
    btime: btime, 
    mtime: mtime, 
    btime2: btime2, 
    mtime2: mtime2, 
    user_data: " is '" +configFile.data.userName + " <" + configFile.data.email + ">'." // You don't need to escape if the quote sign is inside double quotes. 
    // configFile.data.userName and configFile.data.email are values stored in './include/config.js'
    // A lot of redundant typing is involved to pass values to the ejs page... A crazy design. - Don Lim
  }); 
});

/*************** http://127.0.0.1:3000/mysqloutput multiple query ****************/

strsql = "SELECT COUNT(*) AS count FROM department;"; // Do not declare SQL statement variable outside 'router.get' process like this. The value of 'strsql' will change frequently.


router.get("/mysqloutput", async (req, res) => {
    masterRows = [];
    strsql = "SELECT COUNT(*) AS count FROM department;"; 
    strsql2 = "SELECT * FROM department LIMIT 1000;"; 
    console.log(strsql);
    const query1 = poolPromise.query(strsql);
    const query2 = poolPromise.query(strsql2);
    try{
      const results = await Promise.all([query1, query2]);
      results.forEach(([rows, fields]) => masterRows.push(rows));
      res.send(masterRows);
    } catch(err) {
      console.log(err);
      res.send(err);
    } finally {
      pool.end;
      console.log(`All Tasks are Done`);
    }
}); 

/**

router.get("/mysqloutput", async (req, res) => {
  strsql = "SELECT COUNT(*) AS count FROM department; SELECT * FROM department LIMIT 1000;"; 
  console.log(strsql);
  const [rows] = await poolPromise.query(strsql);
  res.send(rows);
}); */




router.get("/mysqloutput",(req,res) => {
  pool.getConnection((err, connection) => {
    if(err) { // perform if there's an error connecting to the DB
      console.log("err : " + err); 
      res.send(err);
//      res.end('Connection failed. If you are developer, see the console.log.'); // alternative message to web user
    } else { // if no error
      console.log('connected as id ' + connection.threadId);
      strsql = "SELECT COUNT(*) AS count FROM department; SELECT * FROM department LIMIT 1000;"; // you can put muliple SQL statements because we have declared 'multipleStatements: true' in './include/dbpool.js'. However, allowing multiple statements makes it vulnerable to SQL injection attacks. So, run only one statement at a time especially if the SQL statement can involve a user input.
      console.log(strsql);
      connection.query(strsql, (err, rows) => {
          connection.release(); // return the connection to pool
          if(err) {
            console.log("err : " + err);
            res.send(err);  // response send err
          } else {
            res.send(rows); // responses send rows
          }
      });
    };
  });
});

/*************** http://127.0.0.1:3000/create ****************/
router.get('/create', (req, res) => {
  pool.getConnection((err, connection) => {
    if(err) {console.log("err : " + err); res.send(err);}
    else {
      console.log('connected as id ' + connection.threadId);
      // edit your SQL below
      strsql = 'CREATE TABLE IF NOT EXISTS department ('
      +'dept_code INT(11) NOT NULL,'
      +'name VARCHAR(200) NULL DEFAULT NULL COLLATE utf8mb3_general_ci,'
      +'PRIMARY KEY (dept_code) USING BTREE);'
      console.log(strsql); // check the final query statement
      connection.query(strsql, (err, rows) => {
        connection.release(); // return the connection to pool
        if(!err) {
          res.send(rows); // responses send rows
        } else {
          console.log("err : " + err);
          res.send(err);  // response send err
        }
      });
    }
  });
});

/*************** http://127.0.0.1:3000/insert ****************/
router.get('/insert', (req, res) => {
  pool.getConnection((err, connection) => {
    if(err) {console.log("err : " + err); res.send(err);}
    else {
      console.log('connected as id ' + connection.threadId);      
      // edit your SQL below
      let strsql = 'INSERT INTO department (dept_code, name) VALUES ?' // It's much safer to use a prepared statement like this to prevent SQL injection.
      
      let values = []; // create an empty array called 'values'
      values.push([5001,"Biology"]); // add an entry to 'values'
      values.push([5002,"Chemistry"]); // add yet another one 
      // you can also state like 'values = [[5004,"Biology"],[5005,"Chemistry"]]'

      strsql = mysql.format(strsql,[values]); // mysql.format will replace '?' in 'strsql' with two sets of data in 'values'
      // Don't ask me why you need to surround 'values' with brackets. Some system may not need them.
      console.log([values]);
      console.log(strsql);
      connection.query(strsql, (err, rows) => {
        connection.release(); // return the connection to pool
        if(!err) {
          res.send(rows); // responses send rows
        } else {
          console.log("err : " + err);
          res.send(err);  // response send err
        }
      });
    }
  });
});

/*************** http://127.0.0.1:3000/viewlist ****************/
router.get('/viewlist', (req, res) => {
  pool.getConnection((err, connection) => {
    if(err) {console.log("err : " + err); res.send(err);}
    else {
      console.log('connected as id ' + connection.threadId); 
      let strsql = 'SELECT *, (SELECT COUNT(*) FROM department LIMIT 1000000) AS totalCount FROM department LIMIT 5'; // Always put a LIMIT. Otherwise, you may paralyze the system.
      console.log(strsql);
      connection.query(strsql, (err, rows) => {
        connection.release(); // return the connection to pool
        if(err) {
          console.log("err : " + err);
          res.send(err);  // response send err
        } else {
//          res.send(rows); // responses send rows
          res.render('viewList', {results: rows}); // render page with data in rows
        }
      });
    }
  });
});

/*************** http://127.0.0.1:3000/update ****************/
router.get('/update', (req, res) => {
  pool.getConnection((err, connection) => {
    if(err) {console.log("err : " + err); res.send(err);}
    else {
      let strsql = 'UPDATE department SET name="UPD ENG" WHERE dept_code=5001'; 
      console.log(strsql);
      connection.query(strsql, (err, rows) => {
        connection.release(); // return the connection to pool
        if(!err) {res.send(rows);} else {console.log("err : "+err);res.send(err);}
      });
    }
  });
});

/*************** http://127.0.0.1:3000/delete ****************/
router.get('/delete', (req, res) => {
  pool.getConnection((err, connection) => {
    if(err) {console.log("err : " + err); res.send(err);}
    else {
      let strsql = 'DELETE FROM department ORDER BY dept_code DESC LIMIT 1'; 
      console.log(strsql);
      connection.query(strsql, (err, rows) => {
        connection.release(); // return the connection to pool
        if(!err) {res.send(rows);} else {console.log("err : "+err);res.send(err);}
      });
    }
  });
});

/*************** http://127.0.0.1:3000/drop ****************/
router.get('/drop', (req, res) => {
  pool.getConnection((err, connection) => {
    if(err) {console.log("err : " + err); res.send(err);}
    else {
      let strsql = 'DROP TABLE department'; 
      console.log(strsql);
      connection.query(strsql, (err, rows) => {
        connection.release(); // return the connection to pool
        if(!err) {res.send(rows);} else {console.log("err : "+err);res.send(err);}
      });
    }
  });
});

router.get('/api/get/demo/:name/:id', (req, res) => {
  var message = { name: req.params.name, id: req.params.id };
  res.status(200).json({
      "message" : message
  });
});

router.post('/api/post/demo', (req, res) => {
  console.log('post data arrived:',req.body); 
  res.status(200).json({
      message : "post submission successful", parameters: req.body
  });
});


module.exports = router;
