const express = require('express')
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken');
const { user_model } = require('../db')

const user_router = express.Router()

user_router.post('/register',async(req,res)=>{
    const {name,email,gender,password} = req.body

    if(name&&email&&gender&&password){
        try{
            const already = await user_model.findOne({email:email})
            if(already){
                return res.status(404).send(`msg:user already exists`)
            }
            bcrypt.hash(password, 4, function(err, hash) {
                // Store hash in your password DB.
                if(err){
                    return res.status(404).send(err)
                }
                else{
                    req.body.password = hash
                    const new_user = new user_model(req.body)
                    new_user.save()
                    return  res.status(200).send('User registerd Successfully')
                }
            });

            
        }
        catch(err){
            res.status(404).send(err)
        }
    }
    else{
        res.status(404).send(`msg : Please provide valid body`)
    }
})

user_router.post('/login',async(req,res)=>{
    const {email,password} = req.body
    if(email&&password){
        try{
            const find_user = await user_model.findOne({email:email})
            if(find_user){
                bcrypt.compare(password, find_user.password, function(err, result) {
                    if(err){
                        return res.status(404).send(err)
                    }
                    if(result){
                        const token  = jwt.sign({user_id:find_user._id},'masai')

                        return res.status(200).send({msg:'Login in Successfull',token:token})
                    }
                    else{
                        res.status(404).send('Invalid Password')
                    }
                });
            }
            else{
                return res.status(404).send(`No user found`)
            }
        }
        catch(err){
            res.status(404).send(err)
        }
    }
    else{
        res.status(404).send(`msg : Please provide valid body`)
    }
})

module.exports = {
    user_router
}