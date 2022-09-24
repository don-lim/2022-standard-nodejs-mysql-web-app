// require/import the 'fs' (filesystem) module. Don Lim
const fs = require('fs');

// get creation and modification time using fs.stat() method with ES6 arrow function statement 
// JavaScript ES6 (also known as ECMAScript 2015 or ECMAScript 6) is the newer version of JavaScript that was introduced in 2015
getFileDate = jsFilePath => {
  fs.stat(jsFilePath, (error, stats) => {
      if (error) {     console.log(error);     return;   }
      console.log(jsFilePath, "modified at:", stats.mtime); 
      btime= stats.birthtime; // creation time
      mtime= stats.mtime; // modification time
    });

  ejsFilePath = jsFilePath.replace("routes","views").replace(".js",".ejs") // replace routes with views and .js with .ejs in the file path

  if(fs.existsSync(ejsFilePath)){fs.stat(ejsFilePath,(error,stats)=>{if(error){console.log(error);return;}console.log(ejsFilePath,"modified at:",stats.mtime);btime2=stats.birthtime;mtime2=stats.mtime;});} // You can make multiple statements with zero space in one line since the of each statement is marked with a semicolon. But, it will be highly unreadable.
}

/*
function getFileDate(jsFilePath){// Old expression of the function above. Both will work fine.
  fs.stat(jsFilePath, (error, stats) => {
      if (error) {     console.log(error);     return;   }
      console.log(jsFilePath, "modified at:", stats.mtime); 
      btime= stats.birthtime; // creation time
      mtime= stats.mtime; // modification time
    });

  ejsFilePath = jsFilePath.replace("routes","views").replace(".js",".ejs") // replace routes with views and .js with .ejs in the file path

  if(fs.existsSync(ejsFilePath)){
    fs.stat(ejsFilePath, (error, stats) => {
      if (error) {     console.log(error);     return;   }
      console.log(ejsFilePath, "modified at:", stats.mtime);
      btime2= stats.birthtime;
      mtime2= stats.mtime;
    });
  }
}
*/

module.exports = {getFileDate}; // You need to list your functions here. {function1, function2, function3}

// alternative way to create a function to be used from outside.
/*
exports.getFileDate = function(jsFilePath){// get creation and modification time using fs.stat() method
  fs.stat(jsFilePath, (error, stats) => {
      if (error) {     console.log(error);     return;   }
      console.log(jsFilePath, "modified at:", stats.mtime); 
      btime= stats.birthtime; // creation time
      mtime= stats.mtime; // modification time
    });

  ejsFilePath = jsFilePath.replace("routes","views").replace(".js",".ejs") // replace routes with views and .js with .ejs in the file path

  if(fs.existsSync(ejsFilePath)){
    fs.stat(ejsFilePath, (error, stats) => {
      if (error) {     console.log(error);     return;   }
      console.log(ejsFilePath, "modified at:", stats.mtime);
      btime2= stats.birthtime;
      mtime2= stats.mtime;
    });
  }
}
*/

