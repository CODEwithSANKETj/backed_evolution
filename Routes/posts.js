const express = require('express')
var jwt = require('jsonwebtoken');
const { auth } = require('../middlewear');
const { post_modle } = require('../db');

const post_router = express.Router()

post_router.post('/add',auth,(req,res)=>{
    console.log(req.body)
    const {title,body,device} = req.body
    if(title && body && device){
        const new_post  = new post_modle(req.body)
        new_post.save()
        return res.status(200).send({msg:"post created successfully"})
    }
    else{
        res.status(404).send('please provide valid body')
    }
})

post_router.patch('/update/:id',auth,async(req,res)=>{
    try{
        const {title,body,device} = req.body
        const user_id = req.body.user_id
        const post_id = req.params.id
        //console.log(user_id,post_id);
        const post = await post_modle.findById(post_id)
       // console.log(post);
        if(!post){
            return res.status(404).send({msg:'Post not found'})
        }
        //console.log(user_id == post.user_id.toString());
        if(user_id !== post.user_id.toString()){
            return res.status(404).send({msg:"Access Denied"})
        }
        const new_body = {
            title:title?title:post.title,
            body:body?body:post.body,
            device:device?device:post.device
        }
        const updated = await post_modle.findByIdAndUpdate(
            post_id,
            new_body,
            {new : true}

        )
        if(updated){
            return res.status(200).send({msg:"Post Updated"})
        }
        else{
            return res.status(404).send({msg:"Error"})
        }
        
        
        
    }
    catch(err){
        res.status(404).send({msg:err})
    }
})
post_router.delete('/delete/:id',auth,async(req,res)=>{
    try{
        
        const user_id = req.body.user_id
        const post_id = req.params.id
        //console.log(user_id,post_id);
        const post = await post_modle.findById(post_id)
       // console.log(post);
        if(!post){
            return res.status(404).send({msg:'Post not found'})
        }
        //console.log(user_id == post.user_id.toString());
        if(user_id !== post.user_id.toString()){
            return res.status(404).send({msg:"Access Denied"})
        }
       
        const deleted = await post_modle.findByIdAndDelete(post_id)
        if(deleted){
            return res.status(200).send({msg:"Post Deleted"})
        }
        else{
            return res.status(404).send({msg:"Error"})
        }
        
        
        
    }
    catch(err){
        res.status(404).send({msg:err})
    }
})

post_router.get('/',auth,async(req,res)=>{
    try{
        
        const user_id = req.body.user_id
        
        //console.log(user_id,post_id);
        const devices = Array.isArray(req.query.device)
        ?req.query.device : [req.query.device]
       // console.log(post);
       const filtered = await post_modle.find({
        user_id:user_id,
        device : {$in : devices}
       })
       
            return res.status(404).send({msg:filtered})
        
        
        
        
    }
    catch(err){
        res.status(404).send({msg:err})
    }
})


module.exports = {
    post_router
}