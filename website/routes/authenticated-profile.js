var express = require('express');
var router = express.Router();
const passport = require('passport');
const mysql = require('mysql')

// module used for profile picture uploads
var multer  = require('multer')
var upload = multer(
    {   dest: 'public/avatarFiles', // where we store the profile picture temp.
        fileFilter:(req, file, callback) => // filters out files of format we dont want
        {   
            let fileError = false;
            
            // checking each file type for picture
            switch (file.mimetype)
            {
                default:
                    fileError = true;
                    callback(null, false);
                    return callback(new Error(" Only upload png or jpg files! Please head back and try again!") );
                    break;

                case "image/png":
                    callback(null,true);
                    break;

                case "image/jpg":
                    callback(null,true);
                    break;
                
                case "image/jpeg":
                    callback(null,true);
                    break;

                case "image/JPEG":
                    callback(null,true);
                    break;
                
            }
        }
     }) 

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
    

    // dont allow user to upload a bio longer than 200 character
    if (updatedBio.length > 200)
    {
        req.session.errors = ("You can only have a max of 200 characters for your bio. Please try again");

        // refresh the page with error
        res.redirect(req.get('referer'));
    }

    else
    {
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
    }
    
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

    // dont allow user to upload a username longer than 200 character
    if (updatedUsername.length > 18)
    {   
        // set session error
        req.session.errors = "You can only have a max of 18 characters for your social media username. Please try again with less";
        
        // refresh the page with error
        res.redirect(req.get('referer'));
    }
    

    // only store in database this if validated userName update isnt too long
    else
    {
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
    }
});


router.post('/avatar', upload.single('avatar'), function (req, res, next) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any


    // store file name in the users profile
    avatarFileName = req.file.filename

    // create sql query line
    sql = mysql.format ("UPDATE ?? SET avatarName = ? WHERE userName = ?", [profileTable, avatarFileName, currentUser]);

    // update the user name for given social media
    connection.query (
    sql, function (err, result)
    {
        if (err) throw err; 
        
        // otherwise we want the page to refresh with our new data
        else
        {
            console.log(result);
            res.redirect(req.get('referer'));
        }

    })
    
    
  })


// finds the query needed to be done depending on the post request details
function getSocialMediaQuery(socialMediaString, updatedUsername, currentUser)
{   
    // initialize
    let sqlQuery = "";

    console.log(socialMediaString);

    // determine query needed to be done
    switch (socialMediaString)
    {
        default:
            sqlQuery = "";
            break;

        case "twitterUser":
            sqlQuery = mysql.format ("UPDATE ?? SET twitterUser = ? WHERE userName = ?", [profileTable, updatedUsername, currentUser]);
            break;

        case "facebookUser":
            sqlQuery = mysql.format ("UPDATE ?? SET facebookUser = ? WHERE userName = ?", [profileTable, updatedUsername, currentUser]);
            break;

        case "snapchatUser":
            sqlQuery = mysql.format ("UPDATE ?? SET snapchatUser = ? WHERE userName = ?", [profileTable, updatedUsername, currentUser]);
            break;
    }

    // return the query that was found
    return sqlQuery;
}


module.exports = router;