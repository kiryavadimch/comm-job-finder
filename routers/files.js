const Router = require('express');
const router = new Router();

const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

const controller = require('../controllers/files')
const permission_volunteer = require('../middleware/permission_volunteer');
const permission_company = require('../middleware/permission_company');

router.post('/company/uploadAvatar', permission_company, upload.single('image'), controller.uploadAvatar)
router.post('/volunteer/uploadAvatar', permission_volunteer, upload.single('image'), controller.uploadAvatar)
router.get('/company/getAvatar', permission_company, controller.getAvatar)
router.get('/volunteer/getAvatar', permission_volunteer, controller.getAvatar)
router.get('/getFile', controller.getFile)

module.exports = router;