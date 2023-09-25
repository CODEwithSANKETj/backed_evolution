const express = require('express')
const jwt = require('jsonwebtoken')
function auth(req,res,next){
    const token = req.header("Authorization").split(' ')[1]
    //console.log(token);
    if(!token){
        return res.send({msg:'Access Denied'})
    }
    jwt.verify(token,'masai',(err,decoded)=>{
        if(err){
            return res.send({msg:err})
        }
        
        req.body.user_id = decoded.user_id
        next()
    })
}
module.exports = {
    auth
}