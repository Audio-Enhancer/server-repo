'use strict'

const express = require('express')
const router = express.Router()
const TheaudioController = require('../controllers/TheaudioController')
const isLogin = require('../middlewares/isLogin')
const media = require('../helpers/media')

router.post('/',isLogin,TheaudioController.createAudio)
      .get('/', TheaudioController.getListOfAudio)

router.post('/uploads/audio',
      media.multer.single('audiofile'),
      media.sendUploadToGCS,
      (req, res) => {
            res.status(200).json({
            link: req.file.cloudStoragePublicUrl
            })
      }
)




















router.get('/myaudios', isLogin, TheaudioController.getUserAudio)
router.delete('/:id', isLogin, TheaudioController.delete);

module.exports = router