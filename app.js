//if (typeof(PhusionPassenger) !== 'undefined') {    PhusionPassenger.configure({ autoInstall: false });}  // Enable it if you are using PhusionPassenger. Don Lim
require('dotenv').config() // bring variables from .env file in the app root directory.
console.log('DBHost in .env',process.env.MASTER_DB_HOST); // check the DBhost in .env file.

// import system modules
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index'); // '.js' is omitted from './routes/index.js'
const usersRouter = require('./routes/users'); // same as './routes/users.js'
const controllerRouter = require('./routes/controller');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json()); // This used to be a part of 'bodyParser' module.
app.use(express.urlencoded({ extended: false })); // This used to be a part of 'bodyParser' module.
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); // location of publicly accessible files

app.use('/', indexRouter); // URL like 'http://127.0.0.1:3000/users' will be handled by './routes/index.js', stated above as 'var indexRouter = require('./routes/index')'.
app.use('/users', usersRouter); // URL like 'http://127.0.0.1:3000/users' will be handled by './routes/users.js', stated above as 'var usersRouter = require('./routes/users')'.
app.use('/controller', controllerRouter);

app.post("/request", (req, res) => {
  console.log('/request arrived',req.body); 
  res.send({message:"success from request"});
})



app.locals.globTitle = '2022 Standard Model of Beginner\'s Node.js/Express Site Using MySQL'; // You have to escape the quote character with a backslash if it is inside quotes. ' => \'
app.locals.globVar = process.env.SAMPLE_USER_ID; // globVar becomes a global variable.
app.locals.globVar2 = "vague"; // globVar2 becomes a global variable.

//if (typeof(PhusionPassenger) !== 'undefined') {app.listen('passenger');} else {app.listen(3000);}  // Enable it if you are using PhusionPassenger.

// catch 404 and forward to error handler
app.use((req, res, next) => { // 'req' is same as 'request'. 'res' is same as 'response'.
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => { // 'err' is same as 'error'.
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
