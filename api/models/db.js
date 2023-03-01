const mysql = require("mysql");
// const dbConfig = require("../config/db.config.js");

// var connection = mysql.createConnection({
//   host: "127.0.0.1",
//   port: 3306,
//   user: "root",
//   password: "KPP55xHJ1sk9Emzm",
//   database: "primeweb",
// });
var connection = mysql.createConnection({
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  password: "the-lazy-one",
  database: "prashik_test_db",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");

  // var sql =
  //   "CREATE TABLE IF NOT EXISTS devices (id INT AUTO_INCREMENT PRIMARY KEY, deviceId VARCHAR(255), username VARCHAR(255),email VARCHAR(255),mobileNo VARCHAR(255),empCode VARCHAR(255),active BIT(1))";
  // connection.query(sql, function (err, result) {
  //   if (err) throw err;
  //   console.log("Device Table created");
  // });
  var sql2 =
    "CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, first_name VARCHAR(255), last_name VARCHAR(255),email VARCHAR(255) UNIQUE,password VARCHAR(500),token VARCHAR(500))";
  connection.query(sql2, function (err, result) {
    if (err) throw err;
    console.log("User Table created");
  });

  var sql3 =
    "CREATE TABLE IF NOT EXISTS contacts (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), email VARCHAR(255) ,message VARCHAR(500))";
  connection.query(sql3, function (err, result) {
    if (err) throw err;
    console.log("Contact Table created");
  });
});

module.exports = connection;
