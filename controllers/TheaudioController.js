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

    // likes audio
    static unlikesAudio(req,res){
        Theaudio.findOne({
            _id: req.params.id
        })
          .then(audio =>{
            
            // check if it's not the user
            if(audio.user != req.decoded.userid){
                // let's likes
                if(audio.unlikes.indexOf(`${req.decoded.userid}`) === -1){
                    audio.update({
                        $push:{
                            unlikes: req.decoded.userid
                        }
                    })
                      .then(audiounlikes =>{
                          res.status(201).json({
                              msg: 'Audio has been unliked',
                              data: audiounlikes
                          })
                      })
                      .catch(error =>{
                          res.status(500).json({
                              msg: 'ERROR Upvote ',error
                          })
                      })
                }else if(audio.unlikes.indexOf(`${req.decoded.userid}`) !== -1){
                    audio.update({
                        $pull: {
                            unlikes: req.decoded.userid
                        }
                    })
                    .then(audiounlikes =>{
                        res.status(201).json({
                            msg: 'Audio unlike has been cancelled',
                            data: audiounlikes
                        })
                    })
                    .catch(error =>{
                        res.status(500).json({
                            msg: 'ERROR Upvote ',error
                        })
                    })
                }
            }else{
                res.status(403).json({ msg: 'You can\'t unlikes your own audio' })
            }
          })
          .catch(error =>{
             res.status(500).json({
                msg: 'ERROR Unlike Audio ',error
             })
          })
    }

    // share audio
    static shareAudio(req,res){
        Theaudio.findOne({
            _id: req.params.id
        })
          .then(audio =>{
              audio.update({
                  $push: {
                      shares: req.decoded.userid
                  }
              })
                .then(shareaudio =>{
                    res.status(201).json({
                        msg: 'Audio has been shared',
                        data: shareaudio
                    })
                })
                .catch(error =>[
                    res.status(500).json({
                        msg: 'ERROR Share Audio ',error
                     })        
                ])
          })
          .catch(error =>{
            res.status(500).json({
                msg: 'ERROR Share Audio ',error
             })
          })
    }

    // search audio by name (keyword)
    static searchAudio(req,res){
        Theaudio.find({})
           .then(allaudio => {
            //    console.log('Search ----' , req.params.keyword)
                let sortedArr = []
                let regex = new RegExp(`${req.params.keyword}`, 'i')
                
                allaudio.forEach( detailaudio =>{
                    if(regex.test(detailaudio.name)){
                        sortedArr.push(detailaudio)
                    }
                })
                res.status(200).json({
                    msg: 'List of search audio',
                    data: sortedArr
                })
           })
           .catch(error  =>{
              res.status(500).json({
                  msg: 'ERROR Search Audio ',error
               })
           })
    }
}

module.exports = TheaudioController