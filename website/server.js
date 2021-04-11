// Dependencies 
const express = require('express');
const mysql = require ('mysql');
const bcrypt = require ('bcryptjs');
const path = require('path');
const cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config()


var hbs = require('express-handlebars');

// helps with safe user authentication
const passport = require('passport')

// reaches out to our passport code (in another file)
const initializePassport = (require('./passport-config'));
initializePassport(passport);


// express session stuff
const expressValidator = require('express-validator');
const expressSession = require('express-session');

// passes messages and errors to pages
const flash = require("express-flash");

// default routes (will begin to transfer 'posts' and 'gets' here soon )
const indexRouter = require('./routes/home');

// contains all supporter functions of express
const app = express();

// listens to port location 
app.listen(3000, ()=> console.log("server listening on port 3000") );

// servers static files from any files within 'public'
app.use(express.static('public'));


// gives access to process json from client 
  // middleware process to allow the json object from client to be read 
app.use(express.json({limit: '15mb' })); // sets a max limit of the limit of what we receive


// var usersRouter = require('./routes/users');

// view engine setup
  // uses templating engine
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts'}));
app.set('views', path.join(__dirname, 'views')); //__dirname is root, then 'views' folder
app.set('view engine', 'hbs'); // currently using hbs

// url encoded is important
app.use(express.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); // where files to be found statically


// grab env variables for secrecy (spooky)
const databaseHost = process.env.DATABASE_HOST_NAME;
const databaseUser = process.env.DATABASE_USER_NAME;
const databasePassword = process.env.DATABASE_PASSWORD ;
const databaseName = process.env.DATABASE_NAME;
const userTable = process.env.DATABASE_MAIN_TABLE;
const sessionSecret = process.env.SESSION_SECRET

// must put it after the parsers (change secret to env variable)
app.use(expressSession({secret:sessionSecret, saveUninitialized: false, resave: false}));
app.use(passport.initialize());
app.use(passport.session())

app.use((flash()));




// INITIALIZE TO DATABASE 
var connection = mysql.createConnection({
    host: databaseHost,
    user: databaseUser,
    password: databasePassword,
    database: databaseName
  }, 'pool');
  
  
  // TEST CONNECTION
//   connection.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected to database!");
//   });

// Routes
app.use('/', indexRouter);


// POST method route
  // first parameter address of location (can be anywhere / any name at all)
  // second parameter: function call. 
    // request - everything within the request (what we requested from the client)
    // resonse - everything we send back to the client
  app.post('/signup', (request, response, next) =>
  {
    // hashing sent password
    try {
      
      // hash password using bcrypt
      const hashedPassword = bcrypt.hashSync(request.body.password, 10);
      
      // store hashed password into object to be sent into database
      request.body.password = hashedPassword;
    
    // otherwise we failed 
    } catch {
      console.log("hash failed");
    }

    // storing query
    var sql = request.body;

    connection.query('INSERT INTO user SET ?', sql, function (err, result) {
      
      // if an error happens, we will send that back to the client
      if (err) 
      {
        dataBaseMessage = "Failure to create column";
        userCreated = false;
        console.log("Column not created");
        console.log(err);
      }
      
      // we succeeded in creating a table
      else 
      {
        dataBaseMessage = "Column for user created";
        userCreated = true;
        console.log("Column for user created");
      }
    
      // what we send back to the client 
      response.json({
        status: "success",
        received: request.body.userName,
        databaseResponse: dataBaseMessage,
        userCreated: userCreated
      })
      
      // prevents errors (need more research)
      next();
      
    });

      
  })

  // post for a user attempting to search
  app.post('/usersearch', (request, response) =>
  {
    searchLetters = request.body.lettersProvided;
    console.log(searchLetters);
    
    // only query and send back data if we have actual information
    if (searchLetters != "")
    {
        // store the letters that were searched into variable to be checked against data base
        searchLetters = request.body.lettersProvided + '%';
        
        // SELECT *(all) FROM (table) where 
        sql = mysql.format ("SELECT userName FROM ?? WHERE userName like ?", [userTable, searchLetters]);

        connection.query (
        sql, function (err, result, fields)
        {
            if (err) throw err;

            console.log(result[0]);

            // send back the info
            // send response back
            response.json ({
                status: "success",
                received: request.body,
                foundUsers: result
            })
           
        });
    }

    else
    {
        response.json ({
            status: "success",
            received: request.body,
            foundUsers: false
        })
    }
    
    
  })
  
  // post request happens in the result that search bar "search" button is clicked
  app.post('/searched', (request, response) =>
  {
    // stores name of user sent from post request
    nameOfUser = request.body.searchData;
    console.log("searched user: " + nameOfUser);

    // redirect info to the a get request of user
    response.redirect('/user/' + nameOfUser);
  })

  // generates dynamic user page using ejs template
  app.get('/user/:username', (request, response, next) =>
  {

    // store username searched
    stringedName = request.params.username;
   
    // look for existing username in database( select the data) 
    var sql = mysql.format("SELECT * FROM ?? WHERE userName=?", [userTable, stringedName]);

    connection.query (
      sql, function (err, result, fields)
      {
          if (err) throw err;
          
          console.log(result);

          // if we have a valid result (matching username in database)
          if (result.length > 0)
          {
            console.log(result[0]);

            // dynamically send info to a page generated(views)
            response.render('userpage', {userName: result[0].userName,
              name: (result[0].firstName + result[0].lastName)});

          }

          // otherwise, we could not find anything
          else
          {
            response.render('error');
          }
          
      });
    
  })

  // testing some real important stuff
  app.post('/searchuser', (request, response) =>
  {
    console.log("yo yo ")
    response.redirect('/user/' + 'dog')
  })

 