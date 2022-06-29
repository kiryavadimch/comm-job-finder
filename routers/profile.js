const Router = require('express');
const router = new Router();

const companyController = require('../controllers/company')
const volunteerController = require('../controllers/volunteer')

const permission_volunteer = require('../middleware/permission_volunteer');
const permission_company = require('../middleware/permission_company');

router.patch('/company/addProfileInfo', permission_company, companyController.addProfileInfo)
router.get('/company/getProfileInfo', permission_company, companyController.getProfileInfo)

router.patch('/volunteer/addProfileInfo', permission_volunteer, volunteerController.addProfileInfo)
router.get('/volunteer/getProfileInfo', permission_volunteer, volunteerController.getProfileInfo)

module.exports = router;