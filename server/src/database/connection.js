const mysql = require('mysql');

//connection to databse
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    insecureAuth : true
   
  });

  db.connect((err) => {
     if(err){
         return console.log('unable to connect to database')
     }
     console.log("Connected!.....")

    //create database
    db.query("CREATE DATABASE IF NOT EXISTS chautari", function (err, result) {  
      if (err) throw err;  
      console.log("Database created");  
      }); 
       
    //create users table
    const usersql="CREATE TABLE IF NOT EXISTS users (user_id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,email VARCHAR(100) NOT NULL UNIQUE,password CHAR(64) NOT NULL, created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP)";
    db.query(usersql, function (err, result) {  
      if (err) throw err;  
      console.log("users table created");  
      });

    //create table structure for screams
    const sql="CREATE TABLE IF NOT EXISTS screams (id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,userHandle VARCHAR(255) NOT NULL,body TEXT NOT NULL,created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP)" ;
    db.query(sql, function (err, result) {  
      if (err) throw err;  
      console.log("scream table created");  
      });

     //create token table
     const tokensql="CREATE TABLE IF NOT EXISTS token (token_id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,user_id INT NOT NULL ,token CHAR(128) NOT NULL, FOREIGN KEY (user_id) REFERENCES users(user_id) )"
     db.query(tokensql, function (err, result) {  
         if (err) throw err;  
         console.log("token table created");  
      });
   
   /* const altersql= "ALTER TABLE users ADD image MEDIUMBLOB  NULL";
     db.query(altersql, function (err, result) {  
      if (err) throw err;  
      console.log("users table altered");  
   });*/
   
  });
  
module.exports=db;