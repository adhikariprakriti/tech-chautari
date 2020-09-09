const jwt=require("jsonwebtoken")
const db = require("../database/connection")

const auth=async(req,res,next)=>{

    try{
        const idToken=req.header('Authorization').replace('Bearer ','')
          const decoded=jwt.verify(idToken,process.env.SECRET_KEY)
        
        
        req.userHandle=decoded.id
        return next();
    }catch(e){
          res.status(401).send({error: "please authenticate."})
    }
}

module.exports=auth