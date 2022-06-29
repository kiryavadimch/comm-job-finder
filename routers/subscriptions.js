const Router = require('express');
const router = new Router();

const controller = require('../controllers/subscriptions');

const permission_company = require('../middleware/permission_company');
const permission_volunteer = require('../middleware/permission_volunteer');



module.exports = router;
