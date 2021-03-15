//var mysql = require ('mysql');
//import mysql from 'mysql';
// const mysql = require("mysql")
// mysql.func()


// var connection = mysql.createConnection({
//   host: '',
//   user: '',
//   password: '',
//   database: ''
// });

//window.alert("this is working!")
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

carter = "carter"

  // object to be sent in post request
  const signInInfo = {carter};

  // contains information regarding the type of fetch request we are doing
  const options = {
    method: 'POST', // type of data 
    headers: {
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(signInInfo) // the actual info passed into the post request
  }

  // actual fetch (post) request (sends the data over)
    // response is what is sent back (we can configure this in server.js)
  fetch('../signup', options).then (response=> {
    console.log(response.json());
  });


// connection.end();

console.log("yo");
function createAccount()
{
/*
  var connection = mysql.createConnection({
    host: '',
    user: '',
    password: '',
    database: ''
  });

  connection.connect();
*/

  var firstName = document.getElementById("validationDefault01").value + "";
  var last_name = document.getElementById("validationDefault02").value;

  console.log(firstName);

  // object to be sent in post request
  const signInInfo = {firstName};

  console.log(signInInfo)

  // contains information regarding the type of fetch request we are doing
  const options = {
    method: 'POST', // type of data 
    headers: {
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(signInInfo) // the actual location(info) passed into the post request
  }
  
  console.log(signInInfo);

  // actual fetch (post) request
  fetch('../signup', options).then (response=> {
    console.log(response.json());
  });



  /*
  var set = {userName: }
  var sql = "INSERT INTO test_key SET " + user_name;

  var query = connection.query(sql, function(error, results, fields) {
    if (error) window.alert("Username taken");
  });

  connection.end();
  */

}
