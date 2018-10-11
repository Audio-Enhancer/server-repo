'use strict'

const jwt = require('jsonwebtoken')
const User = require('../models/user')

function isLogin(req,res,next){
    if(req.headers.hasOwnProperty('token')){

        // get the token
        jwt.verify(req.headers.token,process.env.SECRETTOKEN, (err,decoded)=>{
            let objdecoded = decoded
            User.findOne({
                _id: decoded.userid
            })
              .then(user=>{
                 if(user){
                    req.decoded = objdecoded
                    next()
                 }else{
                     res.status(400).json({
                         msg: 'User not found'
                     })
                 }
              })
              .catch(error =>{
                 res.status(500).json({
                     msg: 'ERROR User not found ',error
                 })
              })
        })
    }else{
        res.status(403).json({
            msg: 'Token not found, You are not authorized'
        })
    }
}

module.exports = isLogin