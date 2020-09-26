const express=require('express')
const router=new express.Router()
const db=require("../../database/connection")
const auth=require("../../middleware/authentication")
const { response } = require('express')

//read all the screams
router.get('/screams',(req,res)=>{
    db.query('SELECT * FROM screams ORDER BY  created_at desc', function (error, results, fields) {
        if (error){
          return res.status(500).send(error)  
        }
     res.status(200).send(results)
    });
}) 

//create screams
router.post('/screams',auth, function (req, res) {
  
    if (req.body.body.trim()==='') {
      return res.status(400).send({ error:'body missing'});
    }
  db.query("SELECT username FROM users WHERE user_id=?",req.id,(err,result)=>{
    const username=result[0].username
    db.query("INSERT INTO screams SET body=?,user_id= ?,username=?,image=?", [req.body.body,req.id,username,req.image], function (error, results, fields) {
      if (error){
          return res.status(500).send(error)
        }
  
     db.query("SELECT * FROM screams WHERE user_id=?",[req.id],(err,result)=>{
      if (error){
        return res.status(500).send(error)
      }
      return(res.status(200).send(result[result.length-1]))
     })
      //return res.send({msg:"scream created",scream:req.body,image:req.image});
      });
  })
});


//get scream of particular id
router.get('/screams/:scream_id',(req,res)=>{
      let scream={}  
     const id=req.params.scream_id
     const sql="SELECT * from screams WHERE scream_id=?";
     db.query(sql,id,(err,result)=>{
      if (err){
        return res.status(500).send(err)
      }
      scream={...result[0]}

      db.query("SELECT * FROM comments WHERE scream_id=?",id,(err,result)=>{
        if (err){
          return res.status(500).send(err)
        }
        scream.comments=result
        
        db.query("SELECT * FROM likes WHERE scream_id=?",id,(err,result)=>{
          if (err){
            return res.status(500).send(err)
          }
          scream.likeCount=result.length
          return res.send(scream);
    
         })
        
       })
  
     })
})


//comment on particular scream
router.post('/scream/:scream_id/comment',auth,(req,res)=>{
     if(req.body.body.trim()===''){
       return res.status(400).send({error:'comment must not be empty'})
     }
     const newComment={
         user_id:req.id,
         username:req.username,
         scream_id:req.params.scream_id,
         body:req.body.body,
         image:req.image,
         created_at:new Date(Date.now())
     }
        
     db.query("INSERT comments SET ?",newComment,(err,result)=>{
      if (err){
        return res.status(500).send(err)
      }

          res.send(newComment);
  
  })
})


//like on particular scream
router.get('/scream/:scream_id/like',auth,(req,res)=>{
     
  db.query("SELECT * FROM likes WHERE scream_id=? AND user_id=?",[req.params.scream_id,req.id],(err,result)=>{
    if (err){
      return res.status(500).send(err)
    }
     
    if(result.length===0){
      db.query("INSERT INTO likes SET ?",{scream_id:req.params.scream_id,user_id:req.id,status:1},(err,result)=>{
        if (err){
          return res.status(500).send(err)
        }
        
        res.send({msg:"scream liked",screamId:req.params.scream_id})
    
      })
    }else{
      return res.status(400).send({msg:"scream already liked"})
    }
  })
})

//get likes
router.get('/scream/:scream_id/likes',auth,(req,res)=>{
     
  db.query("SELECT * FROM likes WHERE scream_id=?",[req.params.scream_id],(err,result)=>{
    if (err){
      return res.status(500).send(err)
    }
     
    return res.status(200).send(res)
})
})



//unlike a scream
router.get('/scream/:scream_id/unlike',auth,(req,res)=>{
  db.query("SELECT * FROM likes WHERE scream_id=? AND user_id=?",[req.params.scream_id,req.id],(err,result)=>{
    if (err){
      return res.status(500).send(err)
    }
     
    if(result.length!==0){
      db.query("DELETE from likes where scream_id=? AND user_id=?",[req.params.scream_id,req.id],(err,result)=>{
        if (err){
          return res.status(500).send(err)
        }
        
        res.send({msg:"scream unliked",screamId:req.params.scream_id})
    
      })
    }else{
      return res.status(400).send({msg:"scream not liked"})
    }
  })
})


//delete scream of particular id
router.delete('/screams/:scream_id',auth,(req,res)=>{

db.query("SELECT * FROM screams WHERE scream_id=?",req.params.scream_id,(err,result)=>{
  if (err){
    return res.status(500).send(err)
  }
if(result.length===0){
  return res.status(404).send("scream doesn't exist")
}

if(result[0].username===req.username){
   db.query("DElETE from screams WHERE scream_id=?",req.params.scream_id,(err,result)=>{
    if (err){
      return res.status(500).send(err)
    }
    return res.status(200).send({msg:"scream deleted successfully"})  
   })
}else{
  return res.status(403).send("unauthorized access")
}
})

})



module.exports=router