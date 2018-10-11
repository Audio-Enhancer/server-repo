'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TheaudioSchema = new Schema({
    name: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    linkmedia: [String]
},{
    timestamps: true
})

const Theaudio = mongoose.model('Theaudio', TheaudioSchema)
module.exports = Theaudio