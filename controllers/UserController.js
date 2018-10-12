'use strict'

const User = require('../models/user')
const jwt = require('jsonwebtoken')
const hashPassword = require('../helpers/hashPassword')

class UserController {
    // register user
    static registerUser(req,res){
        User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
          .then(user =>{
             jwt.sign({
                 userid: user._id,
                 name: user.email,
                 email: user.email
             },process.env.SECRETTOKEN, (err,token)=>{
                 if(!err){
                    res.status(201).json({
                        token: token
                    })
                 }else{
                    res.status(500).json({
                        msg: 'ERROR Register: ',err
                    }) 
                 }
             } )
          })
          .catch(error => {
              res.status(500).json(error)
          })
    }

    // login user 
    static loginUser(req,res){
        let hash = hashPassword(req.body.password)
        User.findOne({
            email: req.body.email,
            password: hash
        })
         .then(user =>{
            if(user){
                // get token
                jwt.sign({
                    userid: user._id,
                    name: user.name,
                    email: user.email
                },process.env.SECRETTOKEN, (err,token)=>{
                    if(!err){
                        res.status(201).json({
                            token: token
                        })
                    }else{
                        res.status(500).json({
                            msg: 'ERROR TOKEN LOGIN ',err
                        })
                    }
                })
            }else{
                res.status(400).json({
                    msg: 'User Not Found Login ERROR'
                })
            }
         })
         .catch(error=>{
            res.status(500).json({
                msg: 'ERROR Register: ',err
            })
         })
    }

}

module.exports = UserController
