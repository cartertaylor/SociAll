var mysql = require('mysql');

var connection = mysql.createConnection({
  host: '23.254.211.150',
  user: 'root',
  password: 'CS386GROUP5',
  database: 'test_db'
});

connection.connect();

/*CREATE DATABASE new*/

connection.query('SELECT 1 + 1 AS solution', function(error, results, fields){
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});



var post = {firstName: 'Other', lastName: 'Name'};
var query = connection.query('INSERT INTO test_table SET ?', post, function( error, results, fields){
  if (error) throw error;
});

console.log(query.sql);


var sql = "CREATE TABLE test_key(userName varchar(255) NOT NULL PRIMARY KEY, firstName varchar(255) NOT NULL)"
var query = connection.query(sql, function(error, results) {
  if (error) throw error;
  console.log(results);
});


var sql = {userName: 'New_username1111', firstName: 'Max'};
var query = connection.query('INSERT INTO test_key SET ?', sql, function( error, results, fields){
});

console.log(query.sql);

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

var sql = "SELECT * FROM test_key";

var query = connection.query(sql, function(error, results, fields) {
  if (error) throw error;
  console.log(results);
});

connection.end();


function createAccount()
{
/*
  var connection = mysql.createConnection({
    host: '23.254.211.150',
    user: 'root',
    password: 'CS386GROUP5',
    database: 'ronsDB'
  });

  connection.connect();
*/

  var first_name = document.getElementById("validationDefault01").value;
  var last_name = document.getElementById("validationDefault02").value;

  window.alert(firstName + "" +  );

  /*
  var set = {userName: }
  var sql = "INSERT INTO test_key SET " + user_name;

  var query = connection.query(sql, function(error, results, fields) {
    if (error) window.alert("Username taken");
  });

  connection.end();
  */

}
