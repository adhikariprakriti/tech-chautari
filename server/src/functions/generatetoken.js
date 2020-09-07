const jwt = require('jsonwebtoken');

const generateAuthToken=(id)=>{
    
       const token=jwt.sign({id:id.toString()},process.env.SECRET_KEY)
       
       return token
}
module.exports=generateAuthToken

