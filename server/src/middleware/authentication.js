const jwt=require("jsonwebtoken")
const db = require("../database/connection")

const auth=async(req,res,next)=>{

    try{
        const idToken=req.header('Authorization').replace('Bearer ','')
        const decoded=jwt.verify(idToken,process.env.SECRET_KEY)
        req.id=decoded.id
        sql="SELECT * from users where user_id= ?"
        db.query(sql,decoded.id,(err,result)=>{
            if(err){
              return res.status(400).send({
                msg:err})
            }
          req.image=result[0].image
          req.username=result[0].username
        return next();
        })
        //return next();

    }catch(e){
          res.status(401).send({error: "please authenticate."})
    }
}

module.exports=auth