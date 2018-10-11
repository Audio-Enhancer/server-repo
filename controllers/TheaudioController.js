'use strict'

const Theaudio = require('../models/theaudio')

class TheaudioController {

    // create audio
    static createAudio(req,res){
        Theaudio.create({
            name: req.body.name,
            user: req.decoded.userid,
            linkmedia: req.body.linkmedia
        })
         .then(theaudio =>{
             res.status(201).json({
                 msg: 'New Audio Created',
                 data: theaudio
             })
         })
         .catch(error => {
             res.status(500).json({
                 msg: 'ERROR Create Audio ',error
             })
         })
    }

    // get lists of audio
    static getListOfAudio(req,res){
        Theaudio.find({}).populate('user')
          .then(theaudios =>{
            res.status(200).json({
                msg: 'List of audios',
                data: theaudios
            })
          })
          .catch(error =>{
              res.status(500).json({
                  msg: 'ERROR Get List Audio ',error
              })
          })
    }
}

module.exports = TheaudioController