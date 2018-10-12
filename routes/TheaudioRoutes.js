'use strict'

const express = require('express')
const router = express.Router()
const TheaudioController = require('../controllers/TheaudioController')
const isLogin = require('../middlewares/isLogin')
const media = require('../helpers/media')

router.get('/topshare',TheaudioController.getTopShare)
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


router.get('/likes/:id', isLogin, TheaudioController.likesAudio)
      .get('/unlikes/:id', isLogin, TheaudioController.unlikesAudio)
      .get('/share/:id', isLogin, TheaudioController.shareAudio)
      .get('/search/:keyword', TheaudioController.searchAudio)
      .get('/:id', TheaudioController.getDetailAudio)
router.delete('/:id', isLogin, TheaudioController.delete);


module.exports = router