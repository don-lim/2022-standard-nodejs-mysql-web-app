const express = require('express');
const router = express.Router(); // run Router() function within express.
const mysql = require('mysql');
const execSql = require('./include/dbpool'); // require mysql and createPool with 100 connection limit and .env DB variables.
const { config } = require('dotenv');
const configFile = require('./include/config');

router.post('/addDept',(req,res) => { // this area is accessed by calling '[hostname/IP:port]/controller/addDept' with a POST method
    console.log('reached controller.js/addDept',req.body); 
    execSql.getConnection((err, connection) => {
        if(err) {console.log("err : " + err); res.send(err);}
        else {
            console.log('connected as id ' + connection.threadId);      
            // edit your SQL below
            let strsql = 'INSERT INTO department (dept_code, name) VALUES (?,?)' // notice the difference between when you use a single set of values and when you use multiple sets of values as seen in 'index.js'
            let values = [req.body.dept_code_new , req.body.name_new]; 
            strsql = mysql.format(strsql,values);
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

router.post('/delDept',(req,res) => { // this area is accessed by calling '[hostname/IP:port]/controller/delDept' with a POST method
    console.log('reached controller.js/delDept',req.body); 
    execSql.getConnection((err, connection) => {
        if(err) {console.log("err : " + err); res.send(err);}
        else {
            console.log('connected as id ' + connection.threadId);      
            // edit your SQL below
            let strsql = 'DELETE FROM ?? WHERE ?? = ?' // You can put ?? placeholder for identifiers and ? placeholder for values.
            let values = ["department","dept_code",req.body.dept_code]; 
            strsql = mysql.format(strsql,values);
            console.log(strsql);
            connection.query(strsql, (err, rows) => {
                connection.release(); // return the connection to pool
                if(!err) {
                    console.log(rows);
                    res.send(rows);
                } else {
                    console.log("err : " + err);
                    res.send(err);  // response send err
                }
            });
        }
    });
});

router.post('/modDept',(req,res) => { // this area is accessed by calling '[hostname/IP:port]/controller/modDept' with a POST method
    console.log('reached controller.js/modDept',req.body); 
    execSql.getConnection((err, connection) => {
        if(err) {console.log("err : " + err); res.send(err);}
        else {
            console.log('connected as id ' + connection.threadId);      
            // edit your SQL below
            let strsql = 'UPDATE department SET ??=?, ??=? WHERE dept_code=?';
            let values = ["dept_code", req.body.dept_code_mod, "name", req.body.name_mod, req.body.dept_code]; 
            strsql = mysql.format(strsql,values);
            console.log(strsql);
            connection.query(strsql, (err, rows) => {
                connection.release(); // return the connection to pool
                if(!err) {
                    console.log(rows);
                    res.send(rows);
//                    res.redirect(req.get('referer')); // Reload the previous page. But, this will not work because we have not moved to a new page, but called this page using 'fetch' command in './javascripts/main.js'. So, we have to let the process after success under the 'fetch' block to reload the page.
                } else {
                    console.log("err : " + err);
                    res.send(err);  // response send err
                }
            });
        }
    });
});





module.exports = router;
