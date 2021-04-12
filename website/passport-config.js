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
// connection.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected to database!");
// });


// handles passport and authentication of user
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
            // checking database for username
            connection.query (
              sql, function (err, result)
              {
                  if (err) throw err;

                  // check if our query was able to find a user
                  if (result[0].userName === username)
                  {
                    
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
            
            // checking database for password
            connection.query (
              sql, function (err, result)
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
              // maybe use result.insertID from query of user, which could make username
              // an object with an id next to it (sql insertID)
            return authCheckDone(null, username);
          }
        
      ));
      
      // allows you to persist data accross session
      passport.serializeUser((user, done) =>
        {
          // to give user an id, you have to generate / select it in the above part (check line 91ish)
          done(null, user);
        }
      );
      
      passport.deserializeUser((id, done)=> 
        {
          done(null,{id});
        }
      );
}

// export file (function initialize)
module.exports = initialize;