const mysql = require('mysql');

//connection to databse
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'password',
    database: 'chautari',
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


  });
  
module.exports=db;