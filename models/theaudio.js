'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TheaudioSchema = new Schema({
    name: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    linkmedia: String,
    linkimg: String,
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    unlikes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'     
    }],
    shares: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
},{
    timestamps: true
})

const Theaudio = mongoose.model('Theaudio', TheaudioSchema)
module.exports = Theaudio