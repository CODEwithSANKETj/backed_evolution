const mongoose = require('mongoose')
require('dotenv').config()
let connection = mongoose.connect(process.env.MONGO_URL)
if(connection){
    console.log('connected to DB');
}
else{
    console.log('Not connected');
}

const user_schema = mongoose.Schema({
    name : {type:String},
    email : {type:String},
    gender : {type:String},
    password : {type:String},
})
const post_schema = mongoose.Schema({
    title:{type:String},
    body : {type:String},
    device : {type:String},
    user_id : {type:String}
})
const user_model = mongoose.model('User',user_schema)
const post_modle = mongoose.model('Post',post_schema)
module.exports = {
    connection,
    user_model,
    post_modle
}