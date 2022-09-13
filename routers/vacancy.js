const Router = require('express');
const router = new Router();

const controller = require('../controllers/vacancy');

const permission_company = require('../middleware/permission_company');
const permission_volunteer = require('../middleware/permission_volunteer');

router.post('/company/createVacancy', permission_company, controller.createVacancy);
router.get('/getVacancies', controller.getVacancies);
router.patch('/updateVacancy', controller.updateVacancy);
router.delete('/deleteVacancy', controller.deleteVacancy);
router.post('/setStatus', controller.setStatus);
router.post('/volunteer/addToFavorite', permission_volunteer, controller.addToFavorite)
router.delete('/volunteer/removeFromFavorite', permission_volunteer, controller.removeFromFavorite)
router.get('/volunteer/getFavorites', permission_volunteer, controller.getFavorites)

module.exports = router;
      