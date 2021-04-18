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

// Universal social media handle updater (can use this when sociall adds more social media)
 // updates given social media username, for the Sociall account (ex: twitter, facebook, etc..) 
router.post('/edit/:socialMediaType', function(req, res) {
    
    // gets us our user name from current session
    currentUser = req.session.passport.user;
    
    // -- trying to find a way to only have one post request for all usernames -- 
    // finds name of column given the post sent
    let columnChange = req.originalUrl;
    columnChange = columnChange.split('/');

    // finds the split portion we want (social media type)
    foundColumn = columnChange[2];
    
    // finds the username we are updating from
    updatedUsername = req.body.message;
    
    // assemble sql query for social media depending on the post req from profile page
    sql = getSocialMediaQuery(foundColumn, updatedUsername, currentUser);

    console.log(sql);

    // update the user name for given social media
    connection.query (
        sql, function (err, result)
        {
            if (err) throw err;

            // otherwise we want the page to refresh with our new data
            else
            {
                res.redirect(req.get('referer'));
            }

        })
    
});

// finds the query needed to be done depending on the post request details
function getSocialMediaQuery(socialMediaString, updatedUsername, currentUser)
{   
    // initialize
    let sqlQuery = "";

    // determine query needed to be done
    switch (socialMediaString)
    {
        default:
            console.log("yoooo")
            break;

        case "twitterUser":
            sqlQuery = mysql.format ("UPDATE ?? SET twitterUser = ? WHERE userName = ?", [profileTable, updatedUsername, currentUser]);
            break;

        case "facebookUser":
            sqlQuery = mysql.format ("UPDATE ?? SET facebookUser = ? WHERE userName = ?", [profileTable, updatedUsername, currentUser]);
            break;

        case "snapchatUser":
            sqlQuery = mysql.format ("UPDATE ?? SET facebookUser = ? WHERE userName = ?", [profileTable, updatedUsername, currentUser]);
            break;
    }

    // return the query that was found
    return sqlQuery;
}


module.exports = router;