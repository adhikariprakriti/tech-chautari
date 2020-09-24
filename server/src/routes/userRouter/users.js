const express = require('express');
const router = express.Router();
const db=require('../../database/connection')
const multer=require('multer')
const auth=require("../../middleware/authentication")
const sharp=require('sharp')
const userdetailsValidator=require("../../functions/addUserProfile")
//image upload
const upload=multer({
    limits: {
        fileSize: 2000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|peg|png)$/)){
           cb(new Error('please upload image'))  
        }
        cb(undefined,true)
    }
    })

router.post('/image',auth,upload.single('avatar'),async (req,res)=>{
      console.log(req.file.buffer)
    const image=await sharp(req.file.buffer).resize({width:250 ,height:250}).png().toBuffer() 
    const id=req.id
    
    const sql="UPDATE users SET image= ? WHERE user_id=?"
       db.query(sql,[image,id ],(err,result)=>{
      if (err){
        return res.status(400).send(err)
      }
    res.status(200).send(req.file)
})

},(error,req,res,next)=>{
    res.status(400).send({error:error.message})
})


router.delete('/image',auth,(req,res)=>{
    const sql="UPDATE users SET image=NULL WHERE user_id=?"
  db.query(sql,[req.id],(err,result)=>{
    if (err){
        return res.status(400).send(err)
      }
      res.send()
})
})

router.get('/:id/image',(req,res)=>{
    const sql="SELECT image FROM users WHERE user_id= ?"
    db.query(sql,req.params.id,(err,result)=>{
        if (err){
            return res.status(400).send(err)
          }
          if(result.length===0 || result[0].avatar===null){
              throw new Error()
          }
         res.set('content-type','image/jpg')
         res.send(result[0].image)    
    })
})




//add/update users profile
router.post('/user',auth,(req,res)=>{
    const userdetails=userdetailsValidator(req.body)
 
       const {bio,location,website}=userdetails
       const sql="UPDATE users SET bio=?,location=?,website=? WHERE user_id=?" 
       db.query(sql,[bio,location,website,req.id],(err,result)=>{
        if (err){
            return res.status(400).send(err)
          }
         res.send({message:"profile details successfully added",userdata:userdetails})
       })
})


 //get authenticated userdetails

router.get('/user',auth,(req,res)=>{
     const userdata={}
     const  sql="SELECT username,email,website,bio,location,user_id,created_at,image FROM users WHERE user_id= ?"
    db.query(sql,req.id,(err,result)=>{
        if (err){
            return res.status(400).send(err)
          }

        const{username,email,website,bio,location,created_at,user_id,image}=result[0]
        userdata.username=username
        userdata.id=user_id
        userdata.email=email
        userdata.created_at=created_at
       
        if(website!==null){
            userdata.website=website
        }
        if(bio!==null){
            userdata.bio=bio
        }
        if(location!==null){
            userdata.location=location
        }
        if(image!==null){
            userdata.image=Buffer.from(image).toString('base64')
        }
      res.send({userdata})     
    })
})



module.exports=router