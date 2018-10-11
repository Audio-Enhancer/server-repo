'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const beautify = require('mongoose-beautiful-unique-validation')

const UserSchema = new Schema({
    name: String,
    email: {
        type: String,
        unique: beautify
    },
    password: {
        type: String
    }
})