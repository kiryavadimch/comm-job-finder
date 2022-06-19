const Router = require('express');
const router = new Router();

const controller = require('../controllers/help')
const permission_volunteer = require('../middleware/permission_volunteer');

router.post('/volunteer/createTicket', permission_volunteer, controller.createTicket)
router.post('/admin/sendAnswer', /* ADMIN PERMISSION HERE */ controller.sendAnswer)
router.get('/admin/tickets', /* ADMIN PERMISSION HERE */ controller.getTickets)

module.exports = router;