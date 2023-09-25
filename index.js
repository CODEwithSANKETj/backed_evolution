const express = require('express')
const { connection } = require('./db')
const { user_router } = require('./Routes/users')
const { post_router } = require('./Routes/posts')
const app = express()
app.use(express.json())
app.use('/users',user_router)
app.use('/posts',post_router)
app.get('/',(req,res)=>{
    res.send('Running Server')
})
app.listen(4040,()=>{
    console.log('Server Running');
})