'use strict'
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
const UserRouter = require('./routes/UserRoutes')
const TheaudioRouter = require('./routes/TheaudioRoutes')

// mongoose.connect('mongodb://localhost:27017/audioenhancerdb',{useNewUrlParser: true});
mongoose.connect(process.env.MONGO_USER, {useNewUrlParser: true})

app.use(express.urlencoded({ extended: false}))
app.use(express.json())
app.use(cors())
app.use('/users', UserRouter)
app.use('/theaudios', TheaudioRouter)

app.get('/' ,(req,res)=>{ res.send('OK')})


app.listen(process.env.PORT || 3000, () =>{
    console.log(`Listening to port ${process.env.PORT}`)
})
