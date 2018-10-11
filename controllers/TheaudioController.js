'use strict'

const Theaudio = require('../models/theaudio')

class TheaudioController {

    // create audio
    static createAudio(req,res){
        Theaudio.create({
            name: req.body.name,
            user: req.decoded.userid,
            linkmedia: req.body.linkmedia,
            linkimg: req.body.linkimg
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

    // likes audio
    static likesAudio(req,res){
        Theaudio.findOne({
            _id: req.params.id
        })
          .then(audio =>{
            
            // check if it's not the user
            if(audio.user != req.decoded.userid){
                // let's likes
                if(audio.likes.indexOf(`${req.decoded.userid}`) === -1){
                    audio.update({
                        $push:{
                            likes: req.decoded.userid
                        }
                    })
                      .then(audiolikes =>{
                          res.status(201).json({
                              msg: 'Audio has been liked',
                              data: audiolikes
                          })
                      })
                      .catch(error =>{
                          res.status(500).json({
                              msg: 'ERROR Upvote ',error
                          })
                      })
                }else if(audio.likes.indexOf(`${req.decoded.userid}`) !== -1){
                    audio.update({
                        $pull: {
                            likes: req.decoded.userid
                        }
                    })
                    .then(audiolikes =>{
                        res.status(201).json({
                            msg: 'Audio like has been cancelled',
                            data: audiolikes
                        })
                    })
                    .catch(error =>{
                        res.status(500).json({
                            msg: 'ERROR Upvote ',error
                        })
                    })
                }
            }else{
                res.status(403).json({ msg: 'You can\'t likes your own audio' })
            }
          })
          .catch(error =>{
             res.status(500).json({
                msg: 'ERROR Like Audio ',error
             })
          })
    }
}

module.exports = TheaudioController