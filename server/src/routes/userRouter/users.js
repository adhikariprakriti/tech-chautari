const express = require('express');
const router = express.Router();
const db=require('../../database/connection')
const multer=require('multer')
const auth=require("../../middleware/authentication")
const sharp=require('sharp')


const upload=multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|peg|png)$/)){
           cb(new Error('please upload image'))  
        }
        cb(undefined,true)
    }
    })

router.post('/image',auth,upload.single('avatar'),async (req,res)=>{
 
    const image=await sharp(req.file.buffer).resize({width:250 ,height:250}).png().toBuffer() 
    const id=req.id
    
    const sql="UPDATE users SET image= ? WHERE user_id=2"
       db.query(sql,[image,id ],(err,result)=>{
      if (err){
        return res.status(400).send(err)
      }

    res.send()

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

module.exports=router