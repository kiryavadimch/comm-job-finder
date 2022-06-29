const Router = require('express');
const router = new Router();

const controller = require('../controllers/help')
const permission_volunteer = require('../middleware/permission_volunteer');
const admin_permission = require('../middleware/permission_admin')

router.post('/volunteer/createTicket', permission_volunteer, controller.createTicket)
router.post('/admin/sendAnswer',admin_permission, controller.sendAnswer)
router.get('/admin/tickets', admin_permission, controller.getTickets)

module.exports = router;