const Router = require('express');
const router = new Router();
const admin = require('../controllers/admin');

const admin_permission = require('../middleware/permission_admin')


//admin
router.get('/admin/whoami', admin_permission, admin.whoAmI);
router.get('/user/getTicketById',  admin_permission, controller.getTicketById)
router.get('/user/getTickets', admin_permission, controller.getTickets)
router.post('/admin/register', admin.register);
router.post('/admin/login', admin.login);
module.exports = router;
