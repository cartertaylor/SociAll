/* Function: checkAgreeTerms()
   Algorithm: checks value of the terms check box element for either "" or "clicked"
   Precondition: is called when the checkbox for agree terms is clicked
   Postcondition: will set value of check box to either checked or empty depending 
    on what it's last action was 
*/
function checkAgreeTerms()
{
  // swap the element value depending on what it is currently at
  
  // if we checked the box, then the value is currently "", set it to "checked"
  if (document.querySelector(".form-check-input").value === "" )
  {
    document.querySelector(".form-check-input").value = "checked";
  } 

  // if we un-checked the box, then the value is currently "checked", set it to ""
  else 
  {
    document.querySelector(".form-check-input").value = "";
  }
}


/* Function: createAccount()
   Algorithm: Grabs information from form boxes. Will attempt to create account 
    if all information is filled out and valid
   Precondition: is called when the "Create Account" button is clicked
   Postcondition: Creates user account if 
    1. All boxes are filled in 
    2. Username is not taken
    Otherwise: No submission will be made, user will be notified of the error 
*/
async function createAccount()
{

  // Gather variable information from HTML form boxes
  let userName = document.getElementById("validationDefaultUsername").value;
  let firstName = document.getElementById("validateFirstName").value;
  let lastName = document.getElementById("validateLastName").value;
  let phoneNumber = document.getElementById("validatePhoneNumber").value;
  let email = document.getElementById("validateEmail").value;
  let password = document.getElementById("validatePassword").value;

 

  // grab the current value of the terms button on the site (will be either "" or "checked")
  let agreeTerms = document.querySelector(".form-check-input").value;

  // create object to be sent in post request
  const signInInfo = {firstName, lastName, phoneNumber, email, userName, password};

  // check for all boxes filled in for sign up, including check box for terms 
    // function: loginBoxesValid
  if (loginBoxesValid(signInInfo) && agreeTerms == "checked")
  {
    
    // contains information regarding the type of fetch request we are doing
    const options = {
      method: 'POST', // type of data 
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(signInInfo) // the actual location(info) passed into the post request as JSON strings
    }
    
    console.log(signInInfo);

    // actual fetch (post) request (sends the data over)
      // response is what is sent back (we can configure this in server.js)
    const response = await fetch('/signup', options) 
    const responseData = await response.json();
    console.log(responseData);
    console.log(responseData.databaseResponse);
    
    // check for if the user was created (if username is already taken)
    if (responseData.userCreated == false)
    {
      window.alert("Sorry, that username was alread taken, please try with another")
    }
    
    // otherwise account was created, redirect
    else if (responseData.userCreated)
    {
      window.alert("Account created! Click 'OK' to be redirected to login")
      window.location.replace("../../")
    }

  }



}


/* Function: loginBoxesValid
   Algorithm: searches object of log in info to make sure all boxes were properly filled out
    if not, the user will be asked to fill in the info
   Precondition: an object of key value pairs, each key representing an input box (ex: username)
    and each value being what was submitted in the box
   Postcondition: True, if all boxes were filled out, False if an empty box was found 
*/
function loginBoxesValid(signInInfo)
{
  // iterate over boxes
  for (value in signInInfo)
  {
    // check for empty box 
    if (signInInfo[value] == "")
    {
      return false;
    }
  }

  // otherwise no empty box was found
  return true;
}



// connection.connect();

/*CREATE DATABASE new*/

// connection.query('CREATE DATABASE testGuy', function(error, results, fields){
//   if (error) throw error;

//   console.log('DATABASE CREATED!');
// });

/*
var post = {firstName: 'Other', lastName: 'Name'};
var query = connection.query('INSERT INTO test_table SET ?', post, function( error, results, fields){
  if (error) throw error;
});
console.log(query.sql);
*/

/*
var sql = "CREATE TABLE test_key(userName varchar(255) NOT NULL PRIMARY KEY, firstName varchar(255) NOT NULL)"
var query = connection.query(sql, function(error, results) {
  if (error) throw error;
  console.log(results);
});
*/


// var sql = {userName: 'New_username1111', firstName: 'Max'};
// var query = connection.query('INSERT INTO test_key SET ?', sql, function( error, results, fields){
// });


// console.log(query.sql);

/*
var post = {userName: 'New_username111', firstName: 'Ron'};
var query = connection.query('INSERT INTO test_key SET ?', post, function( error, results, fields){
});
console.log(query.sql);
var post = {userName: 'New_username111', firstName: 'Quinn'};
var query = connection.query('INSERT INTO test_key SET ?', post, function( error, results, fields){
});
console.log(query.sql);
var post = {userName: 'New_username111', firstName: 'Carter'};
var query = connection.query('INSERT INTO test_key SET ?', post, function( error, results, fields){
  if(error) window.alert("Username is taken");
});
console.log(query.sql);
*/
// var sql = "SELECT * FROM test_key";


// var query = connection.query(sql, function(error, results, fields) {
//   if (error) throw error;
//   console.log(results);
// });

// connection.end();