const express = require('express');
 const logOutRouter = express.Router();

 logOutRouter.get("/logout",(req,res)=>{
    req.logout();
    res.redirect("/");

 });
 module.exports = logOutRouter;