const LocalStrategy = require('passport-local')
const bcrypt = require('bcryptjs');
const mysql = require('mysql');
require('dotenv').config()

// grabbing env variables for database
const databaseHost = process.env.DATABASE_HOST_NAME;
const databaseUser = process.env.DATABASE_USER_NAME;
const databasePassword = process.env.DATABASE_PASSWORD ;
const databaseName = process.env.DATABASE_NAME;
const userTable = process.env.DATABASE_MAIN_TABLE;

var connection = mysql.createConnection({
  host: databaseHost,
  user: databaseUser,
  password: databasePassword,
  database: databaseName
}, 'pool');

// TEST CONNECTION
connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected to database!");
});





function initialize(passport)
{
 
    passport.use(new LocalStrategy(function
      
        // username and password provided from login
          // authCheckDone is a callback that checks for pass or failed connection
        (username, password, authCheckDone)
          {
            // Flags for confirming the username and password 
            foundUsername = false;
            foundPassword = false;

            // Looking for an existing username 
            sql = mysql.format ("SELECT userName FROM ?? WHERE userName like ?", [userTable, username]);

            connection.query (
              sql, function (err, result, fields)
              {
                  if (err) throw err;

                  // check if our query was able to find a user
                  if (result[0].userName === username)
                  {
                    console.log("found user!")
                    
                    // if so, set the found flag
                    foundUsername = true;
                  }

                  // if we didnt find the username, error
                  if (!foundUsername)
                  {
                    // function callback for not found
                    return authCheckDone(null, false, {message:"Incorrect username"});
                  }
              });


            // look for existing password
            sql = mysql.format ("SELECT password FROM ?? WHERE userName = ?", [userTable, username]);

            connection.query (
              sql, function (err, result, fields)
              {
                  if (err) throw err;
                  
                  // check hashedPassword against entered password
                  if (bcrypt.compareSync(password, result[0].password))
                  {
                    foundPassword = true;
                  }

                  // if we didnt find the password, error
                  if (!foundPassword)
                  {
                    // function callback for not found
                    return authCheckDone(null, false, {message:"Incorrect password"});
                  }

              });
      
      
            // otherewise we validated the user
              // maybe use result.inserID from query of user, which could make username
              // an object with an id next to it 
            return authCheckDone(null, username);
          }
        
      ));
      
      // allows you to persist data accross session
      passport.serializeUser((user, done) =>
        {
          console.log("user provided: " + user._id);
          done(null, user);
        }
      );
      
      passport.deserializeUser((id, done)=> 
        {
          console.log("id provided: " + id);
          done(null,{id});
        }
      );
}

// export file (function initialize)
module.exports = initialize;