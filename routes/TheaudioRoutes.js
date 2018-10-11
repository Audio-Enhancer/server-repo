'use strict'

const express = require('express')
const router = express.Router()
const TheaudioController = require('../controllers/TheaudioController')
const isLogin = require('../middlewares/isLogin')

router.post('/',isLogin,TheaudioController.createAudio)
      .get('/', TheaudioController.getListOfAudio)

module.exports = router