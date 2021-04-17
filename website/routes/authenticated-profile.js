var express = require('express');
var router = express.Router();
const passport = require('passport');
const mysql = require('mysql')

require('dotenv').config()

// grabbing env variables for database
const databaseHost = process.env.DATABASE_HOST_NAME;
const databaseUser = process.env.DATABASE_USER_NAME;
const databasePassword = process.env.DATABASE_PASSWORD ;
const databaseName = process.env.DATABASE_NAME;
const profileTable = process.env.DATABASE_PROFILE_TABLE;

var connection = mysql.createConnection({
  host: databaseHost,
  user: databaseUser,
  password: databasePassword,
  database: databaseName
}, 'pool');



// post request for a user to edit their profile
router.post('/edit/bio', function(req, res, next) {
    
    // gets us our user name from current session
    currentUser = req.session.passport.user;
    
    // finds the bio we are updating from
    updatedBio = req.body.message;
    
    // create sql query line
    sql = mysql.format ("UPDATE ?? SET bio = ? WHERE userName = ?", [profileTable, updatedBio, currentUser]);

    // update the users bio
    connection.query (
        sql, function (err, result, fields)
        {
            if (err) throw err;

            // otherwise we want the page to refresh with our new data
            else
            {
                res.redirect(req.get('referer'));
            }

        })
    
});

// Post for each that will work for any of the edits of the user
router.post('/edit/twitterUser', function(req, res, next) {
    
    // gets us our user name from current session
    currentUser = req.session.passport.user;

    // console.log(req);
    // console.log(req.originalUrl);
    console.log(req.body);
    
    // -- trying to find a way to only have one post request for all usernames -- 
    // finds name of column given post
    // let columnChange = req.originalUrl;
    // columnChange = columnChange.split('/');
    // foundColumn = columnChange[0];
    
    // console.log(columnChange);
    // console.log(columnChange);
    // console.log(foundColumn);
    
    // finds the bio we are updating from
    updatedUsername = req.body.message;
    
    // create sql query line to insert twitter username into database
    sql = mysql.format ("UPDATE ?? SET twitterUser = ? WHERE userName = ?", [profileTable, updatedUsername, currentUser]);

    // update the user name for given social media
    connection.query (
        sql, function (err, result, fields)
        {
            if (err) throw err;

            // otherwise we want the page to refresh with our new data
            else
            {
                res.redirect(req.get('referer'));
            }

        })
    
});

module.exports = router;