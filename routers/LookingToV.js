
const Router = require('express');
const router = new Router();

const LookingToController = require('../controllers/LookingTo');

router.post('/LookingTo/create', LookingToController.createLT);
router.delete('/LookingTo/delete', LookingToController.deleteLookingTo)

module.exports = router 