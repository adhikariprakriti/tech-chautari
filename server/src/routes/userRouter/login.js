const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db=require('../../database/connection')


router.post('/api/login', (req,res)=>{
    const {email,password}=req.body

    db.query("SELECT * FROM users WHERE email=?",email,async(err,result)=>{

        if(err){
            return res.status(400).send({
                msg:err
            })
        }

        //check whether the user with that email exists or not
        if(result.length===0){
            return res.status(401).send({
                msg:'email or password is incorrect'
            })
            }

           //check password
           bcrypt.compare(password,result[0].password).then(isMatch=>{
               console.log(isMatch)
              if(isMatch===false){
                  return res.status(401).send({
                    msg:"email or Password is incorrect "
                })
            }



              return res.status(200).send({
                msg:"logged in successfully",
                user:result[0]
           })
          
          })

    })
})

module.exports=router