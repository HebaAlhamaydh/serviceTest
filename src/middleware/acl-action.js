"use strict";
module.exports=(cabability)=>{

    return (req,res,next)=>{
        try{
          if(req.user.actions.includes(cabability))
          {next();}
          else {
            next("Access not allowed");
          }
        }
        catch(e){
            next("inavalid login")
        }
    }
}