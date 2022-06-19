// const Photo = require('../../models/photo')
const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)
const { uploadFile, getFileStream } = require('../s3') 

class fileController {
   async uploadAvatar(req, res) {
      try {
         //check role + set user
         let user = req.volunteer? req.volunteer : req.company
         
         //upload file + delete from server
         const file = req.file
         const result = await uploadFile(file)
         await unlinkFile(file.path)
         console.log(result.Key)

         //set users avatar url
         user.avatar = req.protocol + '://' + req.get('host') + `/files/${req.volunteer?'volunteer':'company'}/getPhoto?key=${result.key}`
         console.log(user.avatar)
         await user.save()

         res.status(200).json({ success: true })
      } catch (e) {
         console.log(e)
         res.status(500).json({ error: e.message })
      }
   }

   async getAvatar(req, res) {
      try {
         let user = req.volunteer ? req.volunteer : req.company
         let key = (user.avatar.split('/')[5]).split('=')[1]
         const readStream = getFileStream(key)
         readStream.pipe(res)
      } catch (e) {
         console.log(e)
         res.status(500).json({ error: e.message })
      }
   }

   async getFile(req, res) {
      try {
         const key = req.params.key
         const readStream = getFileStream(key)
         readStream.pipe(res)
      } catch (e) {
         console.log(e)
         res.status(500).json({ error: e.message })
      }
   }
}

module.exports = new fileController()