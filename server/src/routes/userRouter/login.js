const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db=require('../../database/connection')
const jwt=require('jsonwebtoken')
const generateAuthToken =require('../../functions/generatetoken')


router.post('/api/login', (req,res)=>{
    const {email,password}=req.body
    
    if(req.body.email.trim()===''||req.body.password.trim()===''){
        return res.status(400).send({msg:"email or password must not be empty"})
    
    }

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
               
              if(isMatch===false){
                  return res.status(401).send({
                    msg:"email or Password is incorrect "
                })
            }

             //generate token
             const token=generateAuthToken(result[0].user_id)
             
            /* db.query("INSERT INTO token SET ?", {user_id:result[0].user_id,token:token}, function (err, result) {  
                if (err) throw err;
                console.log(token,"bbb")  
                }); 
            */
                
               return res.status(200).send({
                msg:"logged in successfully",
                user:result[0],
                token
             })
          
          })

    })
})

module.exports=router