const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
var validator = require("email-validator");
const db=require('../../database/connection')
const jwt=require('jsonwebtoken')
const generateAuthToken =require('../../functions/generatetoken')


router.post('/api/register',(req,res)=>{
    
    let{email,password,password_repeat}=req.body
    //creating user object
    const user={
      email,
      password
    }

    //validate user and the information provided by them
    if (!email || !validator.validate(email)) {
      return res.status(400).send({
        msg: 'Please enter valid email id'
      });
    }

    // password min 6 chars
    if (!password || password.length < 6) {
      return res.status(400).send({
        msg: 'Please enter a password with min. 6 chars'
      });
    }

    // password (repeat) does not match
    if (
      !password_repeat ||
      password != password_repeat
    ) {
      return res.status(400).send({
        msg: 'Both passwords must match'
      });
  
  }


    db.query(`SELECT * FROM users WHERE email=?`,email,(err, result) => {
         
        if(err){
            return res.status(400).send({
                msg:err
            })
        }
       
        //check whether username already exist or not
        if (result.length!==0) {
          return res.status(409).send({
            msg: 'This email is already in use!'
          });
        } 
          // username is available
          bcrypt.hash(password, 8).then((hash)=> {
            //set the password to hash value
            user.password=hash

          }).then(()=>{
            db.query("INSERT INTO users SET ?",user,(err,result)=>{
              if(err){
                  return res.status(400).send({
                      msg:err
                  })
              }

            
                
               db.query('SELECT * FROM users WHERE email=?',email,(err,result)=>{
                if(err){
                  return res.status(400).send({
                      msg:err
                  })
                }
                 //generate token after registration
                 console.log(result)
                 const token= generateAuthToken(result[0].user_id)
                 return res.status(201)
                  .send({
                      user,
                      token,
                      msg:"successfully registered"
                    })
               })
       
          })
          })        
  });
})

module.exports=router