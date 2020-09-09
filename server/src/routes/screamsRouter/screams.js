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
    let {body,userHandle} = req.body;
    if (!body || !userHandle) {
      return res.status(400).send({ error:'userHandle or body missing'});
    }
   db.query("INSERT INTO screams SET ? ", { body:body,userHandle:userHandle }, function (error, results, fields) {
    if (error){
        return res.status(500).send(error)
      }

    return res.send({msg:"scream created",scream:req.body});
    });
});


module.exports=router