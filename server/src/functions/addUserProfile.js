const userdetailsValidator=(data)=>{
     const userDetails={}

     if(data.bio.trim()!==''){
         userDetails.bio=data.bio;
     }

     if(data.website.trim()!==''){
         if(data.website.trim().substring(0,4) === 'http'){
                userDetails.website=data.website.trim().replace('https','http')     
         }else{
             userDetails.website=data.website;
         }
     }

     if(data.location.trim()!==''){
        userDetails.location=data.location;
    }
    return userDetails;
}


module.exports=userdetailsValidator