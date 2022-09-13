const Router = require('express');
const router = new Router();
const admincontroller = require('../controllers/admin');

const admin_permission = require('../middleware/permission_admin')


//admin
router.get('/admin/whoami', admin_permission, admincontroller.whoAmI);
router.get('/user/getTicketById',  admin_permission, admincontroller.getTicketById)
router.get('/user/getTickets', admin_permission, admincontroller.getTickets)
router.post('/admin/register', admincontroller.register);
router.post('/admin/login', admincontroller.login);
module.exports = router;
 