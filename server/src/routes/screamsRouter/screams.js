const express=require('express')
const router=new express.Router()
const db=require("../../database/connection")
const auth=require("../../middleware/authentication")

//read all the screams
router.get('/screams',auth,(req,res)=>{
    db.query('SELECT * FROM screams', function (error, results, fields) {
        if (error){
          return res.status(500).send(error)  
        }
     res.send(results)
    });
}) 

//create screams
router.post('/screams',auth, function (req, res) {
  
    if (req.body.body.trim()==='') {
      return res.status(400).send({ error:'body missing'});
    }
  db.query("SELECT username FROM users WHERE user_id=?",req.id,(err,result)=>{
    const username=result[0].username
    db.query("INSERT INTO screams SET body=?,user_id= ?,username=?", [req.body.body,req.id,username], function (error, results, fields) {
      if (error){
          return res.status(500).send(error)
        }
  
      return res.send({msg:"scream created",scream:req.body});
      });
  })
});


//get scream of particular id
router.get('/screams/:scream_id',(req,res)=>{
  
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
      return res.send({scream,comments:result})
     })
     })
})

/*
//comment on particular scream
router.post('/scream/:scream_id/comment',auth,(req,res)=>{
     if(req.body.comment.trim()===''){
       return res.status(400).send({error:'comment must not be empty'})
     }
     
     db.query("INSERT comments SET body=? scream_id=?",[req.body.body,req.params.scream_id)

})
*/

module.exports=router