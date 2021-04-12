const LocalStrategy = require('passport-local')

function initialize(passport)
{
 
    passport.use(new LocalStrategy(function
      
        // username and password provided from login
          // authCheckDone is a callback that checks for pass or failed connection
        (username, password, authCheckDone)
          {
            
            // this part will be done with sql query, ref / help: (https://gist.github.com/manjeshpv/84446e6aa5b3689e8b84)
            console.log("yoooooooooooooooooooo")

            // check for userName 
            if (username != "dogMan2223")
            {
              // function callback for not found
              return authCheckDone(null, false, {message:"Incorrect username"});
            }
      
            // check for password (use sample bycrpyt code from discord)
            if (password != "words123")
            {
              // function callback for not found
              return authCheckDone(null, false, {message:"Incorrect password"});
            }
            console.log("did we get here?")
      
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