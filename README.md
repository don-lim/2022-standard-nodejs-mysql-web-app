## 2022-standard-nodejs-mysql-web-app

[![express](https://www.bairesdev.com/wp-content/uploads//2021/07/Expressjs.svg)](https://expressjs.com)

I've been running a web application production company for about 20 years. I tried to look for a free standard Node.js / MySQL model using JavaScript ES6 or later or Express v4 or later on the Internet. But, I couldn't find one. There are million more things to worry about than coming up with a basic website structure. So, I made this simple website with modern methods, which you can fork freely.

## This model:
- uses JavaScript ES6 / Express v4 or higher commands and expressions ('const' or 'let' was used instead of 'var' in JS (JavaScript). Arrow function like 'const name=(a,b)=>{}' was used instead of 'function name(a,b){}').
`'const' and 'let' only work in the block. A block is a space bounded by {}. The value of 'const' cannot be changed, while the value of 'let' can be replaced. Any undeclared variables will be considered as a variable declared with 'var'.`
- supports Phusion Passenger used by Plesk.
- uses dotenv to prevent sensitive information from getting pushed to Git repositories (include '.env' in '.gitigore' file).
- uses functions in another js file with different ways of stating module.exports.
- uses variables in another js file using exports.
- uses global variables across the whole web application.
- uses a file called controller.js to prevent app.js and index.js from becoming too long. `Therefore, index.js can have the root directory structures and controller.js can have the most actions called from individual ejs.`
- uses fs (filesystem) module to read the modification date of the current file.
- uses more stable MySQL createPool instead of createConnection. `avoid using createConnection in case your coworker forgets to close it or to prevent filling up the max number of connections fast.`
- uses '??' and '?' placeholders. (similar to prepared statement) in MySQL. (SQL injection attack or hacking somewhat prevented.)
- uses 'array push' to build a multiple row JSON object to be inserted into a table.
- uses common partial ejs files for consistent representation of web pages.
- uses 'fetch' instead of 'ajax' in JQuery.
- uses a JQuery minimal modal library for better user experience instead of 'alert', 'confirm' or 'prompt'.
- uses a Google web font.
- uses 'rem' for the font size instead of 'px'.

## License
### The Unlicense (free for all uses)

This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.

In jurisdictions that recognize copyright laws, the author or authors
of this software dedicate any and all copyright interest in the
software to the public domain. We make this dedication for the benefit
of the public at large and to the detriment of our heirs and
successors. We intend this dedication to be an overt act of
relinquishment in perpetuity of all present and future rights to this
software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.


## Notes:
- HTML and SQL are case insensitive.
- JavaScript is case sensitive.
- Making comments for HTML: surround with `<!-- -->`
- Making comments for JavaScript: surround with /* */ OR // on each line
- Making comments for SQL: surround with /* */ OR -- on each line
- Making comments for CSS: surround with /* */

---

#### Tips for writing easy-to-maintain reusable codes:
- Your code will be read by other people. Write so that you won't be misunderstood.
- Use "" for HTML and use '' for JavaScript and SQL.
- Use UPPERCASES for SQL commands and lowercases for identifiers. Use the online pretty print SQL formatter.
``` sql
UPDATE department SET dept_code='5003', name='Biochemistry' WHERE dept_code='5002';
```
- Adjust the tab alignment like crazy.
- Delete unnecessary lines.
- Avoid making a single file longer than 500 lines.
- Put a divider comment in each section.
```
<!--######## begin application form ########-->
//============== my process =============//
/* --------- title --------- */
```

#### Tips for naming things:
- Always use intuitive names for variables, functions, tables, columns, etc. (Avoid using irrelevant/inconsistent names or names that only you can understand like myRidiculousVar, table_1, mueon_sori-inji)
- For functions and variables in JS: Use camel case like 'sendMassEmail', 'varForJSInAFunction'
- For HTML and SQL identifiers: Use all lowercase with underscores like 'id_for_html', 'table_members_2022', 'column_for_you'
- For long directory names: Use hyphens like '/how-to-destroy-toxic-people'
> Some JS process requires converting hyphenated property of CSS to camel case like 'font-size' to 'fontSize', because '-' outside quotes is the reserved keyword for subtraction in JS.
``` php
heading.style.font-size = '2rem'; // doesn't work
heading.style.fontSize = '2rem'; // does work
```

---
In order to run this web app, you have to have a working MySQL database instance. Set up a MySQL DB with any name for the instance and fill in the DB connection info in the '.env' file in the app root directory. 

To set up a DB connection environment, create a file called '.env' in the app root folder using an editor such as VS Code. Then, open the file called '.sample-env'. Copy everything from '.sample-env' and paste it in your new '.env' file. Fill in the DB connection info. You may also want to put your app name or domain in package.json and package-lock.json.

Move to the folder by runnig 'cd /somefolder/anotherfolder/yourfolder' on your terminal (through running 'cmd' on Windows, Git bash or any ssh client). On your terminal, run 'npm install' or 'sudo npm install' to build '/node_modules' folder. To make your life easier, install 'nodemon' to run node.js without manually restarting every time you make a change. After installing 'nodemon', you can run 'nodemon server.js' and access the site through 'http://127.0.0.1:3000' if the code is running on your local computer. 

Please, feel free to email me.


## References
https://expressjs.com/th/starter/generator.html<br>
https://codeforgeek.com/nodejs-mysql-tutorial/<br>
https://kitty-geno.tistory.com/66?category=960541<br>
https://github.com/sidorares/node-mysql2/blob/master/documentation/Promise-Wrapper.md
https://www.digitalocean.com/community/tutorials/how-to-use-ejs-to-template-your-node-application<br>
https://blog.logrocket.com/how-to-use-ejs-template-node-js-application/<br>
https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch<br>
http://anseki.github.io/jquery-plainmodal/<br>
https://www.w3.org/Style/Examples/007/units.en.html<br>
https://developers.google.com/fonts/docs/getting_started<br>

## Further Reading
https://nodejs.org/en/docs/guides/nodejs-docker-webapp/<br>
https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/deployment<br>
https://www.w3schools.com/Js/js_promise.asp<br>
https://stackoverflow.com/questions/58218269/promises-in-mysql2<br>
https://www.geeksforgeeks.org/express-js-express-router-function/<br>
https://medium.com/@saransh98/node-js-stored-procedure-middleware-b086f5c7119d<br>
https://stackoverflow.com/questions/30535309/where-should-i-define-js-function-to-call-in-ejs-template<br>
https://stackoverflow.com/questions/55214160/how-to-add-variable-inside-of-ejs-template<br>
http://expressjs.com/en/resources/middleware/session.html<br>
https://github.com/axios/axios<br>
https://sequelize.org/docs/v6/getting-started/<br>
https://knexjs.org/guide/interfaces.html#streams<br>
https://api.jquery.com/jQuery.post/<br>
http://hayageek.com/jquery-ajax-form-submit/#multipart-form<br>
https://stackoverflow.com/questions/5004233/jquery-ajax-post-example-with-php<br>
https://www.delftstack.com/howto/mysql/update-multiple-columns-in-multiple-rows-with-different-values-in-mysql/



###### for my son who was born this month, Sep 2022, Don Lim, IT consultant / donlim@outlook.kr
